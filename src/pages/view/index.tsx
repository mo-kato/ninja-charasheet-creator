import ViewField from "@/pages/_components/view-field";

export default function View() {
  return (
    <>
      <ViewField />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
