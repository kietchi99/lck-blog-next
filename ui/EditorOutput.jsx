// Nextjs
import dynamic from "next/dynamic";
import Image from "next/image";

function EditorOutput({ content }) {
  const Output = dynamic(
    async () => (await import("editorjs-react-renderer")).default,
    {
      srr: false,
    }
  );
  return <Output data={content?.blocks ? content : null} />;
}

export default EditorOutput;
