import IndexPage from "components/IndexPage";
import { getAllPosts, getClient, getSettings } from "lib/sanity.client";

const client = getClient();
const [settings, posts = []] = await Promise.all([
  getSettings(client),
  getAllPosts(client),
]);
export default function blog3() {
  return (
    <>
      <IndexPage posts={posts} settings={settings} />
    </>
  );
}
