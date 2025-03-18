import CreateForm from "@/pages/_components/create-form";

export default function Create() {
  return (
    <>
      <CreateForm />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
