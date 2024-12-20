import MovieCard from "@/components/shared/cards/movie-card";

const MovieSection = () => {
  const movies = [
    {
      title: "Hacksaw Ridge",
      url: "https://i.pinimg.com/736x/4d/dd/6c/4ddd6cde50cc9ddc2bc20ef22a0d2ad9.jpg",
    },
    {
      title: "The Pianist",
      url: "https://i.pinimg.com/736x/9b/75/89/9b758903777080db319b6d06b553b4e0.jpg",
    },
    {
      title: "Jojo Rabbit",
      url: "https://i.pinimg.com/736x/21/0f/c2/210fc26a9d506f6a93d6b4a45ab45ad6.jpg",
    },
    {
      title: "Monster",
      url: "https://i.pinimg.com/736x/f0/53/14/f0531426528db6fd850909dea1d23f63.jpg",
    },
    {
      title: "Dead Poets Society",
      url: "https://i.pinimg.com/736x/32/b9/57/32b957a7bfd914d0ef6a33634082b1b8.jpg",
    },
    {
      title: "The Truman Show",
      url: "https://i.pinimg.com/736x/fd/3a/2f/fd3a2ff80b489fdd23a434433edaae64.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {movies.map((movie, index) => (
        <MovieCard key={index} title={movie.title} url={movie.url} />
      ))}
    </div>
  );
};

export default MovieSection;
