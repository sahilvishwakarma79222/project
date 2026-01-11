import fs from "fs";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const basePath = path.join(process.cwd(), "public/category", category);

  try {
    const folders = fs.readdirSync(basePath);

    const products = folders.map((folder) => {
      const infoPath = path.join(basePath, folder, "info.json");
      const info = JSON.parse(fs.readFileSync(infoPath, "utf-8"));

      return {
        id: folder,
        ...info,
        images: [1, 2, 3, 4].map(
          (i) => `/category/${category}/${folder}/${i}.jpg`
        ),
        thumbnail: `/category/${category}/${folder}/1.jpg`,
      };
    });

    return Response.json(products);
  } catch (err) {
    return Response.json([], { status: 200 });
  }
}
