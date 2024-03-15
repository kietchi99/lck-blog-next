// React
import { forwardRef, useCallback, useEffect, useState } from "react";

// Chakra UI
import { Box } from "@chakra-ui/react";

function Editor({ defaultValue }, ref) {
  const [isMouted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const initiallizeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "type here to write",
        inlineToolbar: true,
        data: defaultValue || { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file) {
                  const data = new FormData();
                  data.append("file", file);
                  data.append("upload_preset", "article-images");

                  const res = await fetch(
                    "https://api.cloudinary.com/v1_1/dgyax6nzh/image/upload",
                    {
                      method: "POST",
                      body: data,
                    }
                  ).then((res) => res.json());
                  console.log(res);

                  return {
                    success: 1,
                    file: {
                      url: res?.url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          InlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initiallizeEditor();

      setTimeout(() => {});
    };
    if (isMouted) {
      init();
      return () => {};
    }
  }, [isMouted, initiallizeEditor]);

  return <Box id="editor"></Box>;
}

export default forwardRef(Editor);
