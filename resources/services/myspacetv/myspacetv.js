/*
*
* This file is part of xVideoServiceThief,
* an open-source cross-platform Video service download
*
* Copyright (C) 2007 - 2009 Xesc & Technology
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with xVideoServiceThief. If not, see <http://www.gnu.org/licenses/>.
*
* Contact e-mail: Xesc <xeskuu.xvst@gmail.com>
* Program URL   : http://xviservicethief.sourceforge.net/
*
*/

function RegistVideoService()
{
	this.version = "1.0.1";
	this.minVersion = "2.0.0a";
	this.author = "Xesc & Technology 2009";
	this.website = "http://vids.myspace.com/";
	this.ID = "vids.myspace.com";
	this.caption = "Video MySpace";
	this.adultContent = false;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	const URL_GET_XML = "http://mediaservices.myspace.com/services/rss.ashx?type=video&videoID=%1";
	// init result
	var result = new VideoDefinition();
	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(url);
	// get the video title
	result.title = copyBetween(html, "<h1 id=\"tv_tbar_title\">", "</h1>");
	// get the video id
	var videoId = getUrlParam(url, "videoid");
	// download xml
	var xml = http.downloadWebpage(strFormat(URL_GET_XML, videoId));
	// get flv url
	result.URL = copyBetween(xml, 'RTMPE url="', '"');
	result.URL = cleanUrl(result.URL);
	// return the video information
	return result;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x06,0x00,0x00,0x00,0x1f,0xf3,0xff,
		0x61,0x00,0x00,0x01,0x89,0x49,0x44,0x41,0x54,0x78,0xda,0x9d,0x90,0x4b,0x4b,0x02,
		0x51,0x18,0x86,0x67,0xd5,0x6f,0x68,0xdb,0x2a,0x68,0xdb,0x4a,0x09,0x57,0xf5,0x0f,
		0xa2,0x5d,0x5b,0x7f,0x47,0xdb,0x8a,0x16,0xb5,0x28,0xac,0x10,0x2f,0x11,0x84,0x0b,
		0xed,0x2a,0xa2,0xd0,0xa4,0xa2,0x1c,0x73,0x66,0x1c,0x48,0x2c,0xdc,0x25,0x18,0x89,
		0x78,0x1b,0x11,0x15,0xf5,0xed,0x3b,0xc3,0x4c,0x4e,0x89,0x61,0xbe,0xf0,0xc0,0xcc,
		0xe1,0xbc,0xcf,0x7c,0xdf,0x08,0xbf,0xb3,0xee,0xfe,0x5c,0x22,0x1a,0xc4,0xb1,0xe5,
		0xec,0x9c,0xe8,0x10,0x36,0x61,0x86,0xf0,0x42,0x98,0x00,0xb1,0x4d,0x38,0x8d,0x67,
		0x46,0x2c,0xcc,0x2a,0x58,0x24,0x2a,0xc6,0x24,0x9a,0xc1,0xf2,0xb4,0xcb,0xab,0x44,
		0x82,0xc0,0x3f,0x18,0x10,0x22,0xb1,0xc2,0x05,0x0a,0x81,0x39,0x61,0x82,0x61,0x83,
		0xf3,0xea,0x1d,0x49,0x26,0x23,0x9b,0xcd,0xfe,0xc9,0x4d,0x42,0xc5,0xa6,0xbf,0x6c,
		0x0a,0x7a,0x82,0x69,0xbb,0x4b,0xaa,0x53,0x4b,0x8a,0xa2,0xa0,0x50,0x28,0x20,0x97,
		0xcb,0xe9,0xef,0x97,0x8f,0x2f,0x30,0x7b,0xdf,0x02,0xf6,0x2c,0x21,0x93,0xc9,0x20,
		0x1c,0x0e,0x23,0x10,0x08,0xa0,0xd1,0x68,0x60,0x30,0x18,0x20,0x1e,0x8f,0xa3,0xdd,
		0x6e,0x83,0xa7,0xdf,0xef,0x43,0x55,0x55,0xc4,0x99,0x3c,0x29,0x10,0x45,0x11,0xb5,
		0x5a,0x0d,0xf5,0x7a,0x1d,0x92,0x24,0xc1,0x4c,0xb5,0x5a,0x85,0x35,0x8c,0x31,0x3c,
		0x44,0xc5,0x49,0x41,0x24,0x12,0xb1,0x5e,0xe2,0x5f,0xe5,0x13,0xe8,0x53,0x75,0xbb,
		0x5d,0xf0,0x0c,0x87,0x43,0x84,0x42,0x21,0x9c,0x79,0x2e,0x26,0x05,0x5e,0xaf,0x57,
		0xdf,0x4f,0x96,0x65,0xf8,0x7c,0x3e,0xc4,0x62,0x31,0xa4,0xd3,0x69,0x7e,0xae,0xaf,
		0x94,0x4a,0xa5,0xf4,0xb2,0xc7,0xe3,0xc1,0xa9,0x55,0xe0,0x38,0x7a,0x83,0x7d,0x3f,
		0x87,0xeb,0xdb,0x7b,0x68,0x9a,0x86,0x56,0xab,0xa5,0xff,0x2c,0x33,0xc5,0x62,0x11,
		0xa5,0x52,0x09,0x3c,0x9d,0x4e,0x07,0xd1,0x68,0x14,0x2e,0xb7,0x1f,0xf6,0x3d,0x05,
		0x8e,0xc3,0x57,0x08,0xb6,0x5d,0x09,0x9c,0xe0,0xd3,0xb8,0xd4,0x6c,0x36,0x61,0x66,
		0x34,0x1a,0xc1,0x9a,0x5e,0xaf,0x87,0x1d,0x57,0x10,0x46,0x6f,0x2c,0xd8,0x3a,0x91,
		0x51,0xd1,0xfa,0xa0,0xe8,0x3b,0x4f,0x4b,0xbe,0xdc,0xc6,0xc6,0x01,0xfb,0x21,0x28,
		0x12,0x98,0x93,0x3c,0x17,0xac,0x11,0x95,0x39,0xca,0x1f,0xbc,0xfb,0x05,0x52,0xa2,
		0xb3,0x3e,0xf5,0x46,0xcc,0x30,0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,
		0x60,0x82);
}
