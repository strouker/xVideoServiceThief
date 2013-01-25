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
	this.website = "http://www.goear.com/";
	this.ID = "goear.com";
	this.caption = "GoEar";
	this.adultContent = false;
	this.musicSite = true;
}

function getVideoInformation(url)
{
	const URL_GET_XML = "http://www.goear.com/files/xmlfiles/%1/secm%2.xml";
	// init result
	var result = new VideoDefinition();
	// set this as "audio file"
	result.isAudioFile = true;
	result.extension = ".mp3";
	// get sound id
	var songId = copyBetween(url, "/listen/", "/");
	var subId = strCopy(songId, 0, 1);
	// download xml
	var http = new Http();
	var xml = http.downloadWebpage(strFormat(URL_GET_XML, subId, songId));
	// get sound artits and title
	result.title = copyBetween(xml, 'artist="', '"');
	if (result.title != "") result.title += " - ";
	result.title += copyBetween(xml, 'title="', '"');
	// get sound url
	result.URL = copyBetween(xml, 'path="', '"');
	// return the video information
	return result;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x06,0x00,0x00,0x00,0x1f,0xf3,0xff,
		0x61,0x00,0x00,0x02,0x1e,0x49,0x44,0x41,0x54,0x78,0xda,0x8d,0x93,0x51,0x48,0x5a,
		0x61,0x14,0xc7,0x7d,0x2a,0x82,0xa0,0x1e,0x7a,0xea,0xa9,0x7a,0x28,0x22,0x82,0x5e,
		0x0a,0x7a,0x0b,0xa2,0x20,0x82,0x7a,0xe9,0x21,0x7a,0x8e,0x22,0x82,0x08,0x22,0x5a,
		0xac,0x25,0x8b,0xd1,0x1a,0xf4,0x60,0xac,0x21,0x31,0x92,0x4d,0x47,0x36,0xc3,0x41,
		0x2c,0x63,0x39,0x85,0x0d,0x63,0xa3,0x24,0x75,0xd9,0xcc,0xb5,0xc6,0x98,0x38,0x9d,
		0xe5,0x4c,0xaf,0xa6,0xbb,0xea,0xbd,0xff,0x0e,0xe7,0x61,0x63,0xe0,0x95,0xce,0xd3,
		0x77,0xce,0x07,0xbf,0xff,0x39,0xff,0xef,0x7c,0x2a,0x28,0xc4,0xd5,0x55,0x1a,0xcb,
		0xcb,0x1f,0xe0,0x70,0xfc,0x40,0xb1,0x28,0x08,0x88,0xc5,0x24,0x8c,0x8d,0xed,0x61,
		0x6e,0xce,0xf1,0xb7,0x96,0x4a,0xc9,0xb7,0x03,0x44,0xa3,0x69,0xf4,0xf4,0x3c,0x43,
		0x6b,0xeb,0x1a,0x12,0x09,0x11,0xa1,0x50,0x0a,0xb3,0xb3,0x76,0xf8,0xfd,0x51,0xbe,
		0x17,0x04,0x11,0x92,0x24,0x17,0x06,0x64,0x32,0x79,0x0c,0x0d,0x99,0x51,0x52,0x72,
		0x0f,0x2e,0x57,0x08,0x91,0x48,0x0a,0x9d,0x9d,0x7a,0xac,0xaf,0xbb,0x20,0xcb,0x80,
		0xdd,0xfe,0x1d,0x4e,0x67,0x08,0xf9,0xbc,0x02,0xc0,0x6c,0xf6,0xa1,0xb4,0xf4,0x2e,
		0xa6,0xa6,0xf6,0x90,0x4c,0x8a,0xe8,0xef,0x37,0x62,0x60,0xc0,0x84,0x5c,0x4e,0xe2,
		0xbb,0x89,0x89,0x37,0xb8,0xb8,0xb8,0x2e,0x38,0x02,0xb7,0xde,0xdc,0xac,0x45,0x65,
		0xe5,0x03,0x9c,0x9e,0x5e,0xc2,0x68,0x3c,0x41,0x55,0xd5,0x22,0xbc,0xde,0x08,0xe5,
		0x51,0xb4,0xb4,0xac,0xe1,0xe8,0x28,0xac,0xec,0x81,0xd5,0x7a,0x8e,0xb2,0xb2,0x79,
		0x1a,0xe1,0x15,0x82,0x41,0x01,0x6d,0x6d,0x4f,0xd1,0xd5,0x65,0xa0,0x31,0xae,0x31,
		0x3a,0xba,0x83,0xe1,0xe1,0xd7,0x3c,0xa2,0x22,0x60,0x66,0xc6,0x46,0xea,0x6a,0x6c,
		0x6f,0xfb,0xe1,0x76,0x87,0x59,0x5d,0xa3,0xf9,0x88,0xb3,0xb3,0x18,0x1a,0x1a,0x56,
		0x61,0x32,0x7d,0x56,0x7c,0x05,0x32,0x05,0xac,0x56,0x51,0xb1,0x48,0x26,0xfd,0xa4,
		0xf6,0xbd,0x04,0x78,0x04,0x9d,0xce,0xcd,0x79,0x5d,0xdd,0x0a,0x76,0x77,0xbf,0x16,
		0x07,0x74,0x74,0x3c,0x67,0xc0,0xf1,0x71,0x84,0xba,0xf8,0x42,0x80,0x87,0x0c,0xf0,
		0xf9,0x2e,0x51,0x5b,0xbb,0x82,0xad,0x2d,0x5f,0xf1,0x3d,0x18,0x1f,0xb7,0x10,0xe0,
		0x3e,0x6c,0xb6,0x6f,0xd4,0xf6,0x6f,0x06,0x4c,0x4e,0x5a,0xd9,0x83,0xee,0xee,0x17,
		0x18,0x19,0xd9,0x81,0x28,0x16,0xf1,0x40,0xaf,0xf7,0xa0,0xbc,0x7c,0x1e,0x0b,0x0b,
		0xef,0x11,0x8f,0x8b,0xe8,0xed,0x35,0xa2,0xa6,0x46,0x43,0x2b,0x9d,0xc1,0xfe,0x7e,
		0x00,0xf5,0xf5,0x8f,0xc9,0x9b,0x5f,0xca,0x00,0x52,0x25,0x13,0x97,0xd0,0xd4,0xf4,
		0x84,0xd6,0x36,0x0b,0x8f,0x27,0x8c,0xea,0xea,0x25,0x68,0xb5,0x4e,0x50,0xb0,0x89,
		0x6a,0xf5,0x3b,0x02,0xfe,0x29,0x0c,0xc8,0x66,0x25,0x4c,0x4f,0xbf,0x85,0x4a,0x75,
		0x07,0x9b,0x9b,0x27,0x5c,0x33,0x18,0x3e,0xa1,0xbd,0x5d,0x87,0xc3,0xc3,0x20,0xe7,
		0x81,0x40,0x42,0x11,0xc0,0x91,0x4c,0xe6,0xd0,0xd7,0xb7,0x81,0xc6,0xc6,0x55,0x9a,
		0x3d,0xcd,0xb5,0x83,0x83,0x30,0x2c,0x96,0x73,0x48,0xd2,0x6d,0x7e,0x23,0xab,0xc4,
		0x31,0x38,0xf8,0x92,0xbb,0x11,0x04,0x56,0x03,0xad,0xf2,0x7f,0x1f,0x48,0x96,0xff,
		0x9d,0x6f,0x00,0x11,0xc0,0x6e,0x5b,0x75,0x6d,0x1b,0x71,0x00,0x00,0x00,0x00,0x49,
		0x45,0x4e,0x44,0xae,0x42,0x60,0x82);
}
