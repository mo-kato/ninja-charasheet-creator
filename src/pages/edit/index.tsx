import EditForm from "@/pages/_components/edit-form";

export default function Edit() {
  return (
    <>
      <EditForm />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
