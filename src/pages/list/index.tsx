import ListField from "@/pages/_components/list-field";

export default function List() {
  return (
    <>
      <ListField />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
