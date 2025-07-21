"use client";

import { useFormik } from "formik";
import { AnimatePresence, motion } from "motion/react";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { LuBadgeAlert } from "react-icons/lu";
import {
  PiArrowClockwiseBold,
  PiArrowElbowDownLeftBold,
  PiArrowLeftBold,
  PiArrowRightBold,
  PiAsteriskBold,
} from "react-icons/pi";

import { useState } from "react";

import Button from "@/components/shared/button";
import CalInput from "@/components/shared/inputs/cal-input";
import { Input } from "@/components/shared/inputs/ext-input";
import MultiSlider from "@/components/shared/inputs/multi-slider";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";
import calendarMutation from "@/mutation/calendar.mutation";
import { contactSchema, serviceType, userType } from "@/schema/contact-schema";
import "@/styles/slider.css";
import { Contact } from "@/types/contact.types";

const initialValues: Contact = {
  user_type: null,
  budget: ["$500", "$5000"],
  service_type: [],
  name: "",
  email: "",
  phone: "",
  message: "",
  meeting_date: "",
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 10 : -10,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -10 : 10,
    opacity: 0,
  }),
};

const ContactForm = () => {
  const [step, setStep] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const { toast } = useToast();
  const { addCalendarMutation } = calendarMutation();

  const steps = [
    { name: "User Type" },
    { name: "Service" },
    { name: "Basic Info" },
    { name: "Detail" },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(contactSchema),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      addCalendarMutation.mutateAsync(values);
    },
  });

  const validateCurrentStep = async () => {
    const stepFields: Record<number, (keyof typeof initialValues)[]> = {
      0: ["user_type", "budget"],
      1: ["service_type"],
      2: ["name", "email", "phone", "message"],
      3: ["meeting_date"],
    };

    const fieldsToValidate = stepFields[step];

    fieldsToValidate.forEach((field) => {
      formik.setFieldTouched(field, true, false);
    });

    const errors = await formik.validateForm();

    if (step === 3) {
      const date = new Date(formik.values.meeting_date);
      const isValidDate = !isNaN(date.getTime());
      const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;

      if (!isValidDate || !hasTime) {
        formik.setFieldError("meeting_date", "Please pick a time.");
        return false;
      }
    }

    const hasErrors = fieldsToValidate.some((field) => errors[field]);

    return !hasErrors;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();

    if (isValid) {
      if (step === steps.length - 1) {
        formik.submitForm();
      } else {
        setDirection(1);
        setStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    } else {
      toast({
        title: "Please fill the required fields",
        description: "Some fields are missing or incomplete",
        duration: 2000,
        icon: LuBadgeAlert,
        color: "info",
      });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => Math.max(prev - 1, 0));
    }
  };

  const renderStepContent = () => (
    <AnimatePresence custom={direction} mode="wait" initial={false}>
      <motion.div
        key={step}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full space-y-8"
      >
        {step === 0 && (
          <>
            <div className="space-y-3">
              <Label className="relative w-fit text-foreground">
                What kind of business are you?
                <span className="absolute -right-4 -top-0.5">
                  <PiAsteriskBold className="size-3 text-red-600" />
                </span>
              </Label>
              <div className="grid gap-3 md:grid-cols-2">
                {userType.map((type) => (
                  <button
                    key={type.label}
                    type="button"
                    onClick={() =>
                      formik.setFieldValue("user_type", type.value)
                    }
                    className={`anim flex w-full flex-col justify-center rounded p-3 outline-none ring-0 ring-ring/40 focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      formik.values.user_type === type.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent"
                    }`}
                  >
                    <type.icon className="mb-4 size-5" />
                    <h3 className="mb-1 text-left text-sm font-semibold">
                      {type.label}
                    </h3>
                    <p
                      className={`anim text-pretty text-left text-xs ${
                        formik.values.user_type === type.value
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {type.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-foreground">
                What's your current budget?
              </Label>
              <MultiSlider
                min={500}
                max={5000}
                step={100}
                mode="currency"
                value={formik.values.budget}
                onChange={(val) => {
                  formik.setFieldValue("budget", val);
                }}
              />
            </div>
          </>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <Label className="relative w-fit text-foreground">
              What do you need?
              <span className="absolute -right-4 -top-0.5">
                <PiAsteriskBold className="size-3 text-red-600" />
              </span>
            </Label>
            <div className="grid gap-3 xs:grid-cols-2">
              {serviceType.map((type) => {
                const isSelected = formik.values.service_type.includes(
                  type.value,
                );

                const toggleSelection = () => {
                  const current = formik.values.service_type;
                  const updated = isSelected
                    ? current.filter((val: string) => val !== type.value)
                    : [...current, type.value];

                  formik.setFieldValue("service_type", updated);
                };

                return (
                  <button
                    key={type.label}
                    type="button"
                    onClick={toggleSelection}
                    className={`anim flex w-full items-center gap-x-3 rounded px-3 py-4 outline-none ring-0 ring-ring/40 focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent"
                    }`}
                  >
                    <type.icon className="size-4" />
                    <h3 className="text-center text-xs font-semibold sm:text-sm">
                      {type.label}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="relative w-fit text-foreground">
                Name
                <span className="absolute -right-4 -top-0.5">
                  <PiAsteriskBold className="size-3 text-red-600" />
                </span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="space-y-3">
              <Label className="relative w-fit text-foreground">
                Phone number
                <span className="absolute -right-4 -top-0.5">
                  <PiAsteriskBold className="size-3 text-red-600" />
                </span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="phone"
                placeholder="Phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-span-full space-y-3">
              <Label className="relative w-fit text-foreground">
                Email
                <span className="absolute -right-4 -top-0.5">
                  <PiAsteriskBold className="size-3 text-red-600" />
                </span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="hello@acme.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-span-full space-y-3">
              <Label className="relative w-fit text-foreground">
                How can i help?
                <span className="absolute -right-4 -top-0.5">
                  <PiAsteriskBold className="size-3 text-red-600" />
                </span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Message (be short & sweet please)"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <CalInput
            value={formik.values.meeting_date}
            onChange={(val) => {
              formik.setFieldValue("meeting_date", val);
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-8">
        {renderStepContent()}

        <div className="flex justify-between">
          <Button
            type="button"
            size="fit"
            onClick={handleBack}
            disabled={step === 0}
          >
            <PiArrowLeftBold className="size-4" />
          </Button>

          <Button
            type="button"
            size="fit"
            onClick={handleNext}
            disabled={formik.isSubmitting || addCalendarMutation.isPending}
          >
            {step === steps.length - 1 ? (
              formik.isSubmitting || addCalendarMutation.isPending ? (
                <PiArrowClockwiseBold className="size-4 animate-spin" />
              ) : (
                <PiArrowElbowDownLeftBold className="size-4" />
              )
            ) : (
              <>
                <PiArrowRightBold className="size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
