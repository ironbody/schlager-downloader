// To parse this data:
//
//   import { Convert, Schlager } from "./file";
//
//   const schlager = Convert.toSchlager(json);

export interface Schlager {
    "?xml": XML;
    rss:    RSS;
}

export interface XML {
    "@_version":  string;
    "@_encoding": string;
}

export interface RSS {
    channel:           Channel;
    "@_xmlns:dc":      string;
    "@_xmlns:content": string;
    "@_xmlns:atom":    string;
    "@_version":       string;
    "@_xmlns:anchor":  string;
    "@_xmlns:podcast": string;
    "@_xmlns:itunes":  string;
    "@_xmlns:psc":     string;
}

export interface Channel {
    title:             string;
    description:       string;
    link:              string;
    generator:         string;
    lastBuildDate:     string;
    "atom:link":       AtomLink[];
    author:            Author;
    copyright:         Author;
    language:          string;
    "itunes:author":   Author;
    "itunes:summary":  string;
    "itunes:type":     string;
    "itunes:owner":    ItunesOwner;
    "itunes:explicit": boolean;
    "itunes:category": ChannelItunesCategory;
    "itunes:image":    ItunesImage;
    item:              Item[];
}

export interface AtomLink {
    "@_href":  string;
    "@_rel":   string;
    "@_type"?: string;
}

export enum Author {
    AxelBerntHannaLHannaWSandraOchStewen = "Axel, Bernt, Hanna L, Hanna W, Sandra och Stewen",
}

export interface Item {
    title:                string;
    description:          string;
    link:                 string;
    guid:                 GUID;
    "dc:creator":         Author;
    pubDate:              string;
    enclosure:            Enclosure;
    "itunes:summary":     string;
    "itunes:explicit":    boolean;
    "itunes:duration":    string;
    "itunes:image":       ItunesImage;
    "itunes:season":      number;
    "itunes:episode":     number;
    "itunes:episodeType": ItunesEpisodeType;
}

export interface Enclosure {
    "@_url":    string;
    "@_length": string;
    "@_type":   Type;
}

export enum Type {
    AudioMPEG = "audio/mpeg",
    AudioXM4A = "audio/x-m4a",
}

export interface GUID {
    "#text":         string;
    "@_isPermaLink": string;
}

export enum ItunesEpisodeType {
    Full = "full",
}

export interface ItunesImage {
    "@_href": string;
}

export interface ChannelItunesCategory {
    "itunes:category": ItunesCategoryItunesCategory;
    "@_text":          string;
}

export interface ItunesCategoryItunesCategory {
    "@_text": string;
}

export interface ItunesOwner {
    "itunes:name":  Author;
    "itunes:email": string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSchlager(json: string): Schlager {
        return JSON.parse(json);
    }

    public static schlagerToJson(value: Schlager): string {
        return JSON.stringify(value);
    }
}
