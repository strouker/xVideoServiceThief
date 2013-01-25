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
	this.version = "1.0.0";
	this.minVersion = "2.0.0a";
	this.author = "Xesc & Technology 2009";
	this.website = "http://www.gamespot.com/";
	this.ID = "gamespot.com";
	this.caption = "GameSpot";
	this.adultContent = false;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	// init result
	var result = new VideoDefinition();
	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(url);
	// get the video title
	result.title = copyBetween(html, "<title>GameSpot Video:", "</title>");
	// get the xml url
	var xml_url = cleanUrl(copyBetween(html, "paramsURI=", "\""));
	// download xml
	var xml = http.downloadWebpage(xml_url);
	// get flv url
	result.URL = copyBetween(xml, "<URI>", "</URI>");
	// if we are watching this video in HD, we should download the HD version
	if (getUrlParam(url, "hd") == "1") // is HD
		result.URL = strReplace(result.URL, "_400.flv", "_1400.flv");
	// return the video information
	return result;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x03,0x00,0x00,0x00,0x28,0x2d,0x0f,
		0x53,0x00,0x00,0x00,0x96,0x50,0x4c,0x54,0x45,0x00,0x00,0x00,0x00,0x00,0x00,0x03,
		0x06,0x0c,0x0a,0x0a,0x0b,0x0d,0x01,0x01,0x16,0x02,0x02,0x16,0x17,0x1d,0x21,0x01,
		0x01,0x22,0x23,0x26,0x32,0x33,0x38,0x4a,0x4a,0x4b,0x62,0x61,0x60,0x7a,0x01,0x01,
		0x7d,0x6e,0x2d,0x7e,0x7c,0x5f,0x93,0x01,0x00,0xa0,0x1c,0x00,0xa3,0x9a,0x5a,0xa8,
		0x8c,0x15,0xa9,0x59,0x00,0xaf,0x04,0x02,0xb0,0x31,0x00,0xb6,0x6a,0x00,0xc3,0x2c,
		0x2c,0xc3,0xb7,0x7f,0xc7,0x78,0x00,0xcf,0x02,0x01,0xcf,0x8a,0x00,0xd0,0x94,0x20,
		0xdc,0x9e,0x58,0xdd,0xa7,0x37,0xde,0x1f,0x09,0xde,0xa3,0x00,0xe4,0xe0,0xb4,0xe7,
		0x94,0x02,0xe8,0x5c,0x43,0xeb,0x81,0x2a,0xee,0xb3,0x2d,0xf0,0x35,0x32,0xf1,0x1e,
		0x21,0xf1,0xd0,0x51,0xf4,0x02,0x03,0xf5,0x3d,0x40,0xf5,0xb3,0x02,0xfd,0xc8,0x08,
		0xfe,0xd6,0x2c,0xfe,0xf1,0x54,0xfe,0xfa,0x76,0xff,0xde,0x12,0xff,0xeb,0x37,0x5a,
		0xc4,0x8a,0xe6,0x00,0x00,0x00,0x01,0x74,0x52,0x4e,0x53,0x00,0x40,0xe6,0xd8,0x66,
		0x00,0x00,0x00,0xa2,0x49,0x44,0x41,0x54,0x78,0xda,0x6d,0x8e,0xdd,0x12,0x82,0x20,
		0x10,0x46,0xa3,0x34,0x7f,0xd2,0xb0,0x34,0x0a,0x2c,0x2d,0x4a,0xd3,0x16,0x41,0xde,
		0xff,0xe5,0x62,0x1d,0xbd,0xf3,0xdc,0x9d,0x33,0xf3,0xcd,0xee,0x66,0x15,0xef,0xda,
		0xb6,0xdf,0x5e,0xf8,0x8b,0xfb,0xbf,0x77,0xa7,0x75,0x53,0xf7,0xc1,0xe2,0x9d,0x31,
		0x46,0x6b,0xab,0xc4,0x54,0xbc,0xd6,0x39,0x16,0x3b,0xc2,0xb4,0x2a,0x5a,0xab,0xcd,
		0x21,0x8e,0xf6,0xe9,0x08,0x17,0xea,0x42,0xfd,0x19,0x74,0x1c,0x1f,0x8d,0x79,0x8d,
		0x50,0x16,0x2e,0x08,0x35,0x9c,0xe2,0x08,0x17,0x0a,0x4a,0x8a,0x01,0x54,0x1a,0x86,
		0x76,0x20,0x64,0x78,0x72,0x0c,0x85,0x04,0xd8,0xee,0xce,0x8a,0x90,0xa6,0x64,0x18,
		0xa8,0x90,0xc0,0x08,0x52,0xb1,0x2c,0xc1,0xb3,0x05,0x97,0x12,0x1e,0xb7,0xea,0xce,
		0xf3,0x24,0x98,0x1e,0xa3,0x8c,0x71,0xce,0x58,0x3e,0x3b,0x96,0x2c,0x77,0x64,0xe8,
		0x73,0x49,0x10,0xf4,0x15,0xfe,0x74,0x4c,0x11,0x92,0x9d,0x04,0x92,0x01,0x00,0x00,
		0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82);
}
