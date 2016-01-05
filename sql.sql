---
---
{% for serie in site.data.series%}

INSERT INTO `izlelan`.`serie` (`idserie`, `serieName`, `director`, `producer`, `pubYear`, `serieDescription`, `img`, `createdat`, `lastUpdate`)
VALUES ({{serie.idserie}}, {{serie.serieName}}, {{serie.director}}, {{serie.producer}}, {{serie.pubYear}}, {{serie.serieDescription}}, {{serie.img}}, default, default);
{% assign serieID = serie.idserie %}

{% for season in serie.seasons%}

{% assign seasonID = season.idseason %}

INSERT INTO `izlelan`.`season` (`idseason`, `serieID`, `seasonNo`, `seasonName`, `pubDate`, `createdat`, `lastUpdate`)
VALUES ({{seasonID}}, {{serieID}}, {{season.seasonNo}}, {{season.seasonName}}, {{season.pubDate}}, default, default);

{%for episode in season.episodes %}
{% assign episodeID = episode.idepisode %}
INSERT INTO `izlelan`.`episode` (`idepisode`, `seasonID`, `episodeNo`, `episodeName`, `pubDate`, `thumb`, `createdat`, `lastUpdate`)
VALUES ({{episodeID}}, {{seasonID}},{{episode.episodeNo}},{{episode.episodeName}},{{episode.pubDate}},{{episode.thumb}} default, default);

{%for url in episode.urls%}
INSERT INTO `izlelan`.`episodeUrls` (`idepisodeUrls`, `episodeID`, `url`, `lastUpdate`)
VALUES ({{url.idepisodeUrls}},{{episodeID}},{{url.url}} default);
{%endfor%}

{%endfor%}
{%endfor%}

{%endfor%}
