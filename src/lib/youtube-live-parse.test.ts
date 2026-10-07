import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  EVD_YOUTUBE_CHANNEL_ID,
  buildChannelLiveEmbedUrl,
  buildVideoLiveEmbedUrl,
  extractPublicLiveCandidate,
  extractVideoIdFromUrl,
  isValidVideoId,
} from "./youtube-live-parse";

describe("youtube-live-parse", () => {
  it("acepta videoIds válidos de 11 chars", () => {
    assert.equal(isValidVideoId("IId4Usj_fqQ"), true);
    assert.equal(isValidVideoId("short"), false);
    assert.equal(isValidVideoId(""), false);
  });

  it("extrae v= de URLs watch", () => {
    assert.equal(
      extractVideoIdFromUrl(
        "https://www.youtube.com/watch?v=IId4Usj_fqQ&feature=share",
      ),
      "IId4Usj_fqQ",
    );
  });

  it("NO usa el primer videoId suelto del HTML (basura / related jazz)", () => {
    const jazzId = "dQw4w9WgXcQ"; // placeholder 11-char
    const html = `
      <html><head><title>Live</title></head><body>
      {"videoId":"${jazzId}","isLiveNow":true,"isLive":true,"liveBroadcastContent":"live"}
      {"videoId":"aaaaaaaaaaa"}
      </body></html>
    `;
    const candidate = extractPublicLiveCandidate(
      html,
      `https://www.youtube.com/channel/${EVD_YOUTUBE_CHANNEL_ID}/live`,
      EVD_YOUTUBE_CHANNEL_ID,
    );
    assert.equal(candidate, null);
  });

  it("acepta redirect a /watch y rechaza channelId ajeno en player", () => {
    const videoId = "Abcdefghijk";
    const html = `ytInitialPlayerResponse = ${JSON.stringify({
      videoDetails: {
        videoId,
        channelId: "UCxxxxxxxxxxxxxxxxxxxxxx",
        title: "Jazz café",
        isLive: true,
        isLiveContent: true,
      },
      microformat: {
        playerMicroformatRenderer: {
          externalChannelId: "UCxxxxxxxxxxxxxxxxxxxxxx",
          liveBroadcastDetails: { isLiveNow: true },
        },
      },
    })};`;

    const rejected = extractPublicLiveCandidate(
      html,
      `https://www.youtube.com/watch?v=${videoId}`,
      EVD_YOUTUBE_CHANNEL_ID,
    );
    assert.equal(rejected, null);
  });

  it("acepta redirect a /watch del canal EVD con señales live", () => {
    const videoId = "EVDlive0001";
    const html = `ytInitialPlayerResponse = ${JSON.stringify({
      videoDetails: {
        videoId,
        channelId: EVD_YOUTUBE_CHANNEL_ID,
        title: "Kirtan en vivo",
        isLive: true,
        isLiveContent: true,
      },
      microformat: {
        playerMicroformatRenderer: {
          externalChannelId: EVD_YOUTUBE_CHANNEL_ID,
          liveBroadcastDetails: { isLiveNow: true },
        },
      },
    })};`;

    const candidate = extractPublicLiveCandidate(
      html,
      `https://www.youtube.com/watch?v=${videoId}`,
      EVD_YOUTUBE_CHANNEL_ID,
    );
    assert.ok(candidate);
    assert.equal(candidate!.videoId, videoId);
    assert.equal(candidate!.channelIdFromPage, EVD_YOUTUBE_CHANNEL_ID);
    assert.equal(candidate!.pageSignalsLive, true);
    assert.equal(candidate!.extraction, "redirect-url");
  });

  it("buildChannelLiveEmbedUrl apunta al canal y no usa start=", () => {
    const src = buildChannelLiveEmbedUrl(EVD_YOUTUBE_CHANNEL_ID);
    assert.match(src, /\/embed\/live_stream\?/);
    assert.match(src, new RegExp(`channel=${EVD_YOUTUBE_CHANNEL_ID}`));
    assert.match(src, /autoplay=1/);
    assert.doesNotMatch(src, /[?&]start=/);
  });

  it("buildVideoLiveEmbedUrl no fuerza start=0", () => {
    const src = buildVideoLiveEmbedUrl("EVDlive0001");
    assert.doesNotMatch(src, /[?&]start=/);
  });
});
