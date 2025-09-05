import { XMLParser } from "fast-xml-parser";
import { Type } from "./schlager"
import type { Item, Schlager } from "./schlager";
import { format } from "date-fns";

const rss = await Bun.file("./rss").text()
const parsed = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" }).parse(rss) as Schlager

const episodes = parsed.rss.channel.item

console.log("downloading")
const tasks = episodes.map(createTask)
const filenames = await Promise.all(tasks)

filenames.forEach(x => {console.log(`wrote to file at: ${x}`)})

console.log("done");

async function createTask(episode: Item): Promise<string> {
	console.log("downloading: " + episode.enclosure["@_url"]);

	const filename = "./episodes/" + createFilename(episode)
	const blob = await fetch(episode.enclosure["@_url"]).then(r => r.blob())
	await Bun.write(Bun.file(filename), blob)
	return filename
}

function createFilename(episode: Item) {
	const date = formateDate(episode.pubDate)
	const title = formatTitle(episode.title)
	const format = (() => {
		switch (episode.enclosure["@_type"]) {
			case Type.AudioMPEG:
				return ".mp3"
				break;
			case Type.AudioXM4A:
				return ".m4a"
				break
			default:
				throw new Error("Unhandled filetype");
				break;
		}
	})()
	return date + '-' + title + format;
}

function formateDate(dateString: string) {
	const date = new Date(dateString)
	return format(date, "yyyy-MM-dd'T'HH-mm-ss")
}

function formatTitle(title: string) {
	const result = title.toLowerCase()
		.replaceAll(/[.,!"?:\-]/g, '')
		.trim()
		.replaceAll('  ', ' ')

	const words = result.split(" ").slice(0, 5)
	return words.join("-");
}