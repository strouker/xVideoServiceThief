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
	this.website = "http://www.dalealplay.com/";
	this.ID = "dalealplay.com";
	this.caption = "DaleAlPlay";
	this.adultContent = true;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	const URL_GET_FLV = "http://videos.dalealplay.com/contenidos/%1";
	// video information
	var result = new VideoDefinition();
	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(url, false);
	// get video title
	result.title = copyBetween(html, "<title>", "- www.dalealplay.com</title>");
	// get the video path
	var videoPath = copyBetween(html, "file=", "&");
	// build url
	result.URL = cleanUrl(strFormat(URL_GET_FLV, videoPath));
	// return the video information
	return result;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x03,0x00,0x00,0x00,0x28,0x2d,0x0f,
		0x53,0x00,0x00,0x00,0x36,0x50,0x4c,0x54,0x45,0x61,0x00,0x45,0x6b,0x10,0x51,0x75,
		0x20,0x5c,0x7b,0x2a,0x64,0x89,0x40,0x74,0x93,0x50,0x7f,0x9c,0x60,0x8b,0xb0,0x7f,
		0xa2,0xb0,0x80,0xa2,0xba,0x8f,0xad,0xc4,0x9f,0xb9,0xcd,0xaf,0xc5,0xd7,0xbf,0xd0,
		0xe1,0xcf,0xdc,0xeb,0xdf,0xe8,0xef,0xe5,0xec,0xf5,0xef,0xf3,0xff,0xff,0xff,0x7e,
		0x8f,0xf5,0x3d,0x00,0x00,0x00,0x56,0x49,0x44,0x41,0x54,0x18,0x57,0x6d,0x8f,0x4b,
		0x0e,0x80,0x20,0x14,0x03,0x47,0x50,0xc0,0x2f,0xf4,0xfe,0x97,0x75,0xc1,0x27,0xf2,
		0x62,0x97,0x93,0x26,0xd3,0x22,0x13,0x94,0xa3,0xa7,0xc7,0xc7,0x8c,0x22,0xdf,0x44,
		0xe4,0x81,0x3d,0x2d,0xbd,0x83,0x00,0xa4,0x12,0x7a,0xa7,0x01,0xe9,0x5e,0x0d,0x90,
		0x4e,0x67,0x80,0x94,0x2c,0x90,0x01,0xcf,0x36,0x81,0x52,0xdd,0x03,0x1c,0x6e,0xb2,
		0x5c,0x4d,0x4a,0x5d,0x1a,0xc6,0x2c,0xff,0xf3,0xc5,0xbc,0x7d,0x01,0xc8,0x0c,0x06,
		0x5d,0xe6,0x34,0x25,0xeb,0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,0x60,
		0x82);
}
