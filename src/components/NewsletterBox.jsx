const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center mt-10">
      <p className="text-2xl font-medium text-gray-800 dark:text-zinc-200">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem Ipsum is simply the dummy text for printing and typesetting
        industry
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center mx-auto my-6 border pl-4"
      >
        <input
          className="w-full sm:flex-1 dark:text-black py-2 px-2"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};
export default NewsletterBox;
