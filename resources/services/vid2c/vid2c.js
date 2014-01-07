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
	this.version = "1.0.1";
	this.minVersion = "2.0.0a";
	this.author = "crapmaster & Xesc & Technology 2014";
	this.website = "http://www.vid2c.com/";
	this.ID = "vid2c.com";
	this.caption = "Vid2c";
	this.adultContent = true;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	// video information
	var result = new VideoDefinition();

	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(url);

	// get video title
	result.title = copyBetween(html, '<meta name="description" content="', '" />');

	// get video url
	var video_url = /'file': '(.*?)'/;
	if (video_url.test(html)) {
		result.URL = video_url.exec(html)[1];
	}

	// return the video information
	return result;
}

function searchVideos(keyWord, pageIndex)
{
	const URL_SEARCH = "http://www.vid2c.com/search?search_query=%1&search_type=videos&page=%2";
	const HTML_SEARCH_START = 'Showing ';
	const HTML_SEARCH_FINISH = '</html>';
	const HTML_SEARCH_SEPARATOR = '<div class="video_box">';
	// replace all spaces for "+"
	keyWord = strReplace(keyWord, " ", "+");
	// init search results object
	var searchResults = new SearchResults();
	// init http object
	var http = new Http();
	var html = http.downloadWebpage(strFormat(URL_SEARCH, keyWord, pageIndex) + "&user_choice=Enter");
	// no summary avaiable
	searchResults.setSummary("");
	// get results html block
	var htmlResults = copyBetween(html, HTML_SEARCH_START, HTML_SEARCH_FINISH);
	// if we found some results then...
	if (htmlResults != "") {
		var blocks = splitString(htmlResults, HTML_SEARCH_SEPARATOR);
		// Have to skip n=0 since that entry only contains crap!
		for (n = 1; n < blocks.length-1; n++)
			parseResultItem(searchResults, blocks[n]);
	}
	// return search results
	return searchResults;
}

function parseResultItem(searchResults, html)
{
	const VIDEO_URL = "http://www.vid2c.com";
	// vars
	var tmp, videoUrl, imageUrl, title, description, duration, rating;

	// get video url
	videoUrl = VIDEO_URL + copyBetween(html, '<a href=\"', '\">');

	// get title and image url
	title = copyBetween(html, 'title=\"', '\"');
	imageUrl = copyBetween(html, '<img src=\"', '\"');

	// video description not available
	description = "";

	// get video duration
	tmp = copyBetween(html, '<div class=\"box_left\">', '<br />');
	duration = convertToSeconds(tmp);

	// skip rating
	rating = 0;

	// add to results list
	searchResults.addSearchResult(videoUrl, imageUrl, title, description, duration, rating);
}

function convertToSeconds(text)
{
	//Clean
	var tmp2 = strReplace(text, "<span>", "");
	var tmp2 = strReplace(tmp2, "</span>", "");
	// how many ":" exists?
	var count = getTokenCount(tmp2, ":");
	// get mins and seconds
	var h = new Number(h = count == 3 ? getToken(tmp2, ":", 0) * 3600 : 0);
	var m = new Number(getToken(tmp2, ":", count - 2) * 60);
	var s = new Number(getToken(tmp2, ":", count - 1));
	// convert h:m:s to seconds
	return h + m + s;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x06,0x00,0x00,0x00,0x1f,0xf3,0xff,
		0x61,0x00,0x00,0x00,0x01,0x73,0x52,0x47,0x42,0x00,0xae,0xce,0x1c,0xe9,0x00,0x00,
		0x00,0x06,0x62,0x4b,0x47,0x44,0x00,0xff,0x00,0xff,0x00,0xff,0xa0,0xbd,0xa7,0x93,
		0x00,0x00,0x00,0x09,0x70,0x48,0x59,0x73,0x00,0x00,0x0b,0x13,0x00,0x00,0x0b,0x13,
		0x01,0x00,0x9a,0x9c,0x18,0x00,0x00,0x00,0x07,0x74,0x49,0x4d,0x45,0x07,0xdb,0x0a,
		0x0c,0x13,0x27,0x27,0xd5,0xe4,0xfb,0x72,0x00,0x00,0x03,0x38,0x49,0x44,0x41,0x54,
		0x38,0xcb,0x65,0x93,0x5b,0x4c,0x9b,0x05,0x18,0x86,0x9f,0xbf,0xff,0xdf,0x03,0xa5,
		0x8c,0x16,0x8a,0xa3,0x02,0x06,0xd9,0xba,0xc2,0xb0,0x43,0xd4,0xd5,0x86,0x31,0x87,
		0x9b,0x3a,0x43,0xb2,0xcd,0xcd,0xa8,0x89,0x51,0x33,0xf5,0xc2,0x79,0x67,0x8c,0xf1,
		0xc6,0xb8,0x2c,0x1a,0x0d,0x6c,0x17,0x5e,0x98,0x49,0xdc,0x85,0x71,0x64,0x31,0x0e,
		0x77,0x8a,0x31,0x8b,0x46,0x86,0x56,0x1c,0x0e,0x39,0xcc,0x74,0xb0,0x45,0x90,0x43,
		0x69,0x81,0xf5,0x40,0x29,0xfd,0xe9,0xf9,0x2f,0xbf,0x17,0x8d,0x44,0xf4,0xbd,0xfb,
		0x92,0xef,0x7d,0xbf,0x7c,0xc9,0xf3,0x0a,0xfc,0x47,0x93,0xb7,0x6e,0xa8,0xc3,0x97,
		0xbf,0x66,0x75,0x6e,0x08,0x45,0x89,0xa1,0x2d,0xde,0x0e,0x80,0xa5,0xa1,0x89,0x5d,
		0x07,0x5f,0xa0,0xf2,0x3e,0xbb,0xf0,0xef,0xfd,0xf5,0x21,0x9d,0x92,0xd5,0x9f,0x3e,
		0x7e,0x8f,0xb5,0xe1,0xaf,0x70,0x1c,0xb2,0x50,0x5c,0x67,0x43,0x2b,0x99,0x28,0xb2,
		0xed,0x47,0xc9,0x57,0xb0,0x38,0x13,0xe4,0xea,0x97,0x57,0xa8,0x3f,0x70,0x98,0xf6,
		0xa3,0x6f,0x09,0x1b,0x02,0xd2,0x29,0x59,0xed,0x3e,0xf6,0x12,0x55,0xa1,0xeb,0x3c,
		0xfc,0x5a,0x33,0x9b,0x9a,0x1e,0x43,0x57,0xb9,0x8d,0xc4,0xd4,0x04,0xe1,0xc1,0x6e,
		0x00,0xf2,0xc5,0x76,0x2c,0x0e,0x37,0x57,0xce,0xf7,0x62,0xb2,0xed,0xe6,0xc5,0x77,
		0x3e,0x12,0x00,0x24,0x80,0xcb,0xa7,0xde,0x27,0xe7,0xed,0x63,0xeb,0x1b,0x2e,0xcc,
		0xad,0x07,0x89,0xfb,0x97,0x09,0x74,0x74,0x90,0x9d,0xf4,0x15,0xae,0x34,0x19,0x01,
		0x2f,0x24,0x32,0x3c,0xfb,0xa6,0x8b,0x33,0x27,0x2f,0xe0,0xb9,0xda,0xa3,0xee,0x69,
		0x7f,0x5e,0xd0,0xf8,0xa7,0xff,0x50,0x3d,0x5d,0x9f,0xe1,0x78,0xb4,0x9a,0x7b,0x9f,
		0xdc,0x49,0x7a,0x61,0x8e,0x91,0x97,0x3b,0x59,0xba,0x1d,0xa0,0x6c,0x7f,0x03,0xb2,
		0x9c,0xe3,0x66,0x4f,0x90,0x54,0xbe,0x94,0xda,0x43,0x3b,0xc8,0x86,0x02,0x1c,0x79,
		0xc5,0xce,0xa5,0xcf,0x3f,0x20,0xb9,0xba,0xa2,0x6a,0xfa,0x2f,0x7d,0x43,0xb5,0x01,
		0x6a,0x76,0xdd,0x8f,0xce,0x98,0x21,0xd2,0x3f,0x8a,0x6f,0x22,0x81,0xf3,0xf8,0xd3,
		0x58,0xdb,0x1c,0x94,0x6e,0x36,0x42,0x38,0x47,0x24,0x2c,0x91,0xcb,0xc5,0xd1,0x99,
		0x14,0xf4,0x82,0xc2,0x96,0x86,0x0c,0xde,0x21,0x0f,0x9a,0xb1,0xeb,0xbd,0x58,0xcc,
		0x7a,0xcc,0x5b,0xb4,0xe4,0x57,0x22,0x58,0x1f,0x2a,0xe7,0xf1,0xae,0x7d,0x98,0xb7,
		0x19,0xc8,0x87,0x42,0x2c,0xcd,0xae,0x12,0x55,0xc1,0x6c,0xcd,0xa2,0x51,0x64,0x44,
		0x31,0x05,0xd9,0x34,0x0e,0xe7,0x26,0xee,0x0c,0xfd,0x8a,0xb4,0xe2,0x0f,0x52,0x57,
		0x69,0x24,0x3d,0x2f,0xa3,0xce,0x27,0x11,0x45,0x3d,0xd6,0x1a,0x13,0xa9,0xa9,0x30,
		0xd1,0x91,0x20,0xbe,0x89,0x04,0x65,0xf7,0x68,0xa9,0x72,0x95,0x11,0x1e,0x89,0x90,
		0xd0,0x65,0x49,0x86,0x93,0xc8,0x31,0x85,0xd0,0x9c,0x1f,0x4d,0x69,0xcd,0x66,0x5a,
		0x8e,0xd9,0x01,0x90,0x4c,0x06,0x34,0x7a,0x11,0xb1,0x44,0x4f,0xe8,0x97,0x79,0x46,
		0x3a,0x87,0xa9,0x70,0x58,0x78,0xe6,0x74,0x1b,0x15,0xb5,0xa5,0x88,0x46,0x01,0x4b,
		0x91,0x06,0x80,0xfe,0xae,0x3f,0x0b,0x1e,0x8b,0xad,0x1c,0x88,0x53,0x5c,0x6e,0xc0,
		0x60,0x31,0x22,0x19,0x74,0x04,0x7e,0x58,0x28,0x98,0x1f,0xb1,0xe2,0xfe,0x64,0x2f,
		0xba,0x6a,0x89,0x5c,0x34,0x8d,0x98,0x12,0x10,0x8b,0x0c,0x30,0xb7,0x4a,0x26,0xa9,
		0xb2,0xb5,0xbe,0x11,0x4d,0xa3,0xeb,0x29,0x6e,0x4f,0xc6,0x0b,0x69,0x06,0x1d,0xf2,
		0x9d,0x65,0xa6,0xdf,0xee,0xa3,0x4a,0x27,0xd2,0xd8,0x66,0x63,0xf1,0x5a,0x00,0xdf,
		0xd9,0x59,0x96,0x26,0x96,0x11,0x8b,0x60,0x4d,0x02,0xff,0x8d,0x08,0x31,0x45,0x60,
		0xc7,0x9e,0x27,0xd0,0xb8,0xdb,0x8f,0x70,0xd3,0x93,0x20,0x6f,0xd0,0x92,0x8b,0x65,
		0xc9,0x47,0x15,0xf4,0x06,0x11,0x80,0xb1,0x93,0xb7,0x98,0x3d,0x3e,0xc0,0xf0,0x89,
		0x01,0xc6,0xbe,0xf0,0xa2,0x2f,0x33,0xb3,0x38,0x18,0x63,0xfc,0xda,0x5d,0xea,0x5a,
		0x1f,0xa4,0xb6,0xbe,0xb9,0x40,0xe2,0xcf,0x3d,0x67,0xd4,0x79,0xcf,0xa7,0x3c,0xf7,
		0xaa,0x0b,0x45,0x96,0xd7,0x39,0xcf,0x2e,0x24,0x90,0x4a,0x24,0x14,0xb3,0x1e,0xa9,
		0x44,0x60,0x79,0xfc,0x2e,0x83,0xa7,0xbd,0x5c,0xf8,0x2b,0xc9,0x87,0x7d,0x1e,0xec,
		0x4e,0xb7,0xb0,0xce,0xf4,0x77,0x1d,0xef,0xaa,0x46,0x5f,0x2f,0xad,0xaf,0x37,0xaf,
		0x07,0x28,0x91,0xc2,0x6b,0x6b,0xd9,0x2c,0xf1,0x81,0x19,0xc6,0xbf,0x9f,0xe1,0x62,
		0x30,0xc3,0xd1,0x73,0xe7,0x71,0xef,0x3b,0x2c,0x6c,0x28,0x13,0xc0,0xe8,0xb7,0xe7,
		0xd4,0xe9,0xee,0x53,0xd4,0x34,0x5b,0xa9,0x76,0x56,0x20,0x86,0x62,0xcc,0x9e,0xfd,
		0x1d,0x59,0xce,0x31,0xb5,0x90,0x26,0xb9,0xbb,0x85,0x03,0x27,0x3a,0xb1,0x3b,0xdd,
		0xc2,0xff,0xda,0xf8,0x8f,0x12,0x2b,0x51,0x75,0xac,0xff,0x47,0xa6,0x47,0x7f,0x43,
		0x9e,0x9a,0x01,0xc0,0xe4,0x7c,0x80,0xc6,0x96,0xbd,0x6c,0xdf,0xd9,0x8a,0x56,0xab,
		0xdf,0xe0,0xf9,0x1b,0x87,0x5c,0x4c,0x1d,0x8d,0x6c,0xe1,0xe0,0x00,0x00,0x00,0x00,
		0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82);
}