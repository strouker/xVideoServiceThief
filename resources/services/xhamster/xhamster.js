/*
*
* This file is part of xVideoServiceThief,
* an open-source cross-platform Video service download
*
* Copyright (C) 2007 - 2014 Xesc & Technology
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
	this.version = "1.0.3";
	this.minVersion = "2.0.0a";
	this.author = "Supelex Technologies (mantained by Xesc & Technology 2014)";
	this.website = "http://www.xhamster.com/";
	this.ID = "xhamster.com";
	this.caption = "Xhamster";
	this.adultContent = true;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	const FLV_URL = "%1/key=%2";
	// video information
	var result = new VideoDefinition();
	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(url);
	// get video title
	result.title = copyBetween(html, "<title>", "</title>");
	// get the flv url
	var srv = /'srv'\s*:\s*'(.*?)'/
	var file = /'file'\s*:\s*'(.*?)'/
	// build final URL
	result.URL = strFormat(FLV_URL, srv.exec(html)[1], file.exec(html)[1]);
	// return the video information
	return result;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x06,0x00,0x00,0x00,0x1f,0xf3,0xff,
		0x61,0x00,0x00,0x02,0xef,0x49,0x44,0x41,0x54,0x38,0x11,0xad,0xc1,0x7f,0x4c,0x94,
		0x75,0x1c,0xc0,0xf1,0xcf,0xf7,0xb9,0x9f,0x70,0x72,0x40,0x8f,0x87,0x19,0x26,0x4b,
		0x04,0x75,0xd3,0x02,0x31,0xa9,0xa5,0xa3,0x36,0x25,0x4d,0xed,0x87,0xda,0x22,0x57,
		0xcb,0x81,0xcd,0xcc,0xd8,0xd2,0x35,0x36,0x96,0xf4,0x43,0x14,0x67,0xae,0x99,0x2c,
		0x5d,0x22,0xe1,0xc8,0xe5,0x8a,0x70,0x26,0x26,0xd3,0x64,0x32,0x48,0xd7,0x1f,0x0a,
		0xd3,0xab,0xe6,0xa2,0x11,0x50,0x96,0x58,0xe6,0x71,0xc7,0xdd,0xc1,0x73,0x77,0xcf,
		0xf3,0x6e,0xb4,0xb5,0xdd,0x5a,0x6e,0xfd,0xd1,0xeb,0x25,0xf2,0x7f,0x49,0x73,0xcb,
		0x7b,0xe5,0x0b,0x6c,0x66,0x8a,0x5d,0x0a,0xe5,0x36,0xe6,0x7a,0x95,0x7f,0x65,0xae,
		0x66,0x78,0x9c,0x92,0x26,0xc9,0x5c,0x0e,0x51,0xdb,0xd7,0xe9,0xe6,0xd6,0x27,0x74,
		0x56,0x14,0xb9,0x2c,0xa5,0x89,0x5d,0x89,0x38,0x35,0x25,0xaf,0xd9,0x94,0x6c,0x53,
		0x4a,0x1c,0x9a,0x92,0x85,0x5b,0x9e,0x9a,0x42,0xfd,0x86,0xbb,0x29,0x9e,0x65,0xbb,
		0x28,0xc9,0xdc,0x0e,0xb1,0x3d,0x5e,0x98,0xc2,0x83,0x73,0x9c,0x6c,0x78,0x48,0xb1,
		0xb4,0xc0,0xcd,0x48,0x4f,0x35,0xf1,0x6b,0x35,0x24,0xfe,0xa8,0x25,0xda,0xb7,0x9d,
		0x2d,0x25,0x1a,0xcb,0x8a,0x14,0x6b,0x0a,0xd3,0x98,0x9e,0xa5,0x45,0x25,0x99,0xae,
		0x2b,0x6d,0xfe,0x3d,0x8e,0x44,0xe5,0x12,0xa1,0xee,0x3e,0xe1,0xf0,0x03,0x4e,0xe2,
		0xed,0xcb,0xb0,0x0c,0x3f,0xd6,0xb8,0x1f,0xd3,0xbf,0x9c,0xe3,0x73,0x35,0x0e,0x64,
		0x09,0x9b,0x4a,0x84,0xa9,0x3e,0x69,0x93,0x7f,0x72,0xbb,0xe4,0xd9,0xc5,0xba,0x30,
		0xd8,0xdd,0x48,0xed,0xf5,0x28,0xc7,0xab,0x4a,0xe9,0x7d,0x33,0x97,0xd8,0x1e,0x1f,
		0xcd,0xb5,0x7b,0x29,0x09,0x99,0xc4,0x6f,0x36,0x93,0xeb,0x12,0x34,0x25,0x4e,0x49,
		0xa6,0xbb,0xe4,0xc9,0xfc,0x4c,0x19,0xda,0x57,0x6a,0xa7,0xe9,0x83,0x43,0xb8,0x9c,
		0x0e,0xba,0x1f,0xb1,0x31,0x54,0x61,0xc7,0xac,0xb1,0xb1,0x4d,0x57,0x68,0x62,0x63,
		0x3c,0xf8,0x2b,0xbd,0xa5,0xca,0xba,0xcb,0x29,0x63,0x4e,0x4d,0x1e,0x93,0x09,0xd9,
		0x5e,0x79,0xe9,0xc5,0xe5,0xd9,0xfc,0xd4,0x77,0x85,0xc6,0x35,0xe9,0x9c,0x2b,0x77,
		0x30,0xb6,0x37,0x03,0xeb,0xf2,0x73,0x58,0x09,0x03,0x2b,0x16,0x07,0xe3,0x7d,0x38,
		0xed,0xc5,0x78,0x55,0xd1,0x32,0x5f,0x23,0x16,0x19,0x65,0xe7,0xba,0x39,0xe8,0x6e,
		0xa9,0x94,0x85,0xd9,0x6a,0xe0,0x6a,0xcf,0x57,0xfc,0xdc,0xff,0x2d,0x8d,0xeb,0xa7,
		0x32,0xd8,0xb0,0x88,0xf1,0x33,0x2f,0x80,0x65,0xf2,0x97,0xb8,0x85,0x69,0x59,0x58,
		0xe1,0x06,0x42,0x5f,0xac,0xe2,0x54,0xb9,0x8b,0xa1,0x81,0x7e,0x22,0xa1,0x20,0xc5,
		0x53,0xb4,0x80,0x2c,0xb8,0x53,0x5d,0xbe,0xd4,0xdd,0xce,0xf9,0xcf,0x0f,0xf2,0xe9,
		0xc6,0xe9,0xf8,0xf7,0x3d,0xcc,0x58,0xf0,0x17,0x82,0xe1,0x04,0xdf,0xb7,0x9e,0xe4,
		0xca,0xb1,0x13,0xec,0xaf,0x6b,0x05,0xcb,0xe4,0xb7,0xa6,0x52,0xbe,0xa9,0xd6,0xb9,
		0xd0,0x5c,0xc5,0xcd,0x1b,0xc3,0x14,0x4c,0xd6,0xae,0x4a,0x4e,0xa6,0x3c,0xf3,0xca,
		0xea,0x22,0x06,0x7f,0xfc,0x8e,0x77,0x57,0xeb,0xb4,0x6e,0x9e,0x4d,0x34,0x11,0xc3,
		0x18,0x37,0x58,0x3b,0x73,0x1e,0xb3,0xbc,0x3a,0xbd,0x9d,0x5f,0x13,0x37,0xe1,0x6c,
		0x55,0x3e,0xfb,0x0b,0xec,0x04,0x03,0x37,0xd8,0xb1,0x79,0x05,0xbe,0x54,0x29,0x93,
		0x09,0x39,0xe9,0x72,0xb8,0xfe,0xf5,0x0a,0x7a,0x4f,0x37,0x71,0xe2,0x8d,0x25,0x04,
		0xa3,0x06,0x13,0x82,0xa1,0x08,0x9d,0xdd,0x5d,0x4c,0x08,0x27,0x4c,0xba,0xde,0x5a,
		0x44,0x5f,0xfb,0x3b,0x1c,0x6b,0xa8,0x63,0x9a,0x47,0x3e,0x93,0xbf,0xcd,0xf0,0x49,
		0x6a,0x7e,0xa6,0x74,0x1c,0x7a,0xbb,0x82,0xfe,0x8b,0x6d,0x84,0x23,0x51,0xfa,0x7e,
		0xe8,0xe7,0xa3,0x23,0x4d,0xec,0xda,0x5d,0xc7,0xb9,0x8e,0x0e,0x42,0x46,0x8c,0xdf,
		0xfd,0x5f,0x72,0xf2,0x60,0x35,0x39,0xe9,0xd2,0x95,0xa7,0x4b,0x8a,0x24,0xcb,0xcb,
		0x12,0xcf,0xcc,0x0c,0x69,0xa9,0x2d,0x5f,0xcc,0xf5,0x01,0x3f,0x23,0xe1,0x08,0x81,
		0xd1,0x28,0x23,0xa3,0x63,0x0c,0x07,0x46,0xb8,0x35,0x3c,0x48,0xfd,0xd6,0x95,0xe4,
		0x65,0xc8,0xd1,0x3b,0x3c,0xe2,0x91,0xdb,0xc9,0xf2,0x48,0xe5,0xaa,0xd9,0xee,0xc0,
		0x87,0x35,0x65,0x5c,0x3a,0xdb,0x42,0x4f,0x67,0x1b,0x9f,0xec,0xd9,0xc8,0xd3,0x85,
		0x69,0xb7,0x7c,0xa9,0xf2,0xb2,0xfc,0x17,0x39,0x19,0xb2,0xf4,0xde,0xc9,0xf2,0x71,
		0xd9,0xfd,0x93,0x4e,0x3d,0x5f,0x3c,0xa9,0xbd,0xc8,0x27,0x47,0xa7,0x79,0xe5,0x51,
		0xf9,0x17,0x7f,0x02,0x8b,0xb6,0xa2,0xb9,0x68,0x8f,0x0b,0xdd,0x00,0x00,0x00,0x00,
		0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82);
}