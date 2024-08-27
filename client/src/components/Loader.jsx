import { Spinner } from "@chakra-ui/react";
const Loader = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
      <Spinner size="xl" />
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
