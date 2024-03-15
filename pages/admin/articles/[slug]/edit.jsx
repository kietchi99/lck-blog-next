// Compnents
import Toast from "@/ui/Toast";
import CreateArticle from "@/ui/CreateArticle";

// Api
import { getAllArticles, getArticle } from "@/pages/api/articles";
import { Center } from "@chakra-ui/react";

//contexts
import { useDarkMode } from "../../../../context/themeContext";

function Edit({ article }) {
  const { SecondaryBg } = useDarkMode();
  return (
    <Center bg={SecondaryBg} flex={1}>
      <Toast />
      <CreateArticle defaultValue={article} />
    </Center>
  );
}

export async function getStaticProps({ params }) {
  const article = await getArticle(params.slug);
  return {
    props: { article },
  };
}

export async function getStaticPaths() {
  const articles = await getAllArticles();
  const paths = articles.map((a) => {
    return {
      params: { slug: a.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default Edit;
