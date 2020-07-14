
var ObjectID = require('mongodb').ObjectID;
var db = require('../db');
var mongoose = require("mongoose");
var Call = require("../models/call");
var Star = require("../models/star");

var defaultNumResults = 50;


var channels = {};

var allcalls = [
       {
          "_id":"5f07d4a07f26d125bfd6716b",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348697.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348697.m4a",
          "time":"2020-07-10T02:38:17.000Z",
          "srcList":[
             {
                "_id":"5f07d4a07f26d125bfd6716c",
                "pos":0.1,
                "src":"45825"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d48d7f26d125bfd66efc",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348669.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348669.m4a",
          "time":"2020-07-10T02:37:49.000Z",
          "srcList":[
             {
                "_id":"5f07d48d7f26d125bfd66f00",
                "pos":0,
                "src":"46714"
             },
             {
                "_id":"5f07d48d7f26d125bfd66eff",
                "pos":2.05,
                "src":"45825"
             },
             {
                "_id":"5f07d48d7f26d125bfd66efe",
                "pos":10.16,
                "src":"46714"
             },
             {
                "_id":"5f07d48d7f26d125bfd66efd",
                "pos":10.4,
                "src":"45825"
             }
          ],
          "star":0,
          "len":10
       },
       {
          "_id":"5f07d47d7f26d125bfd66667",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348664.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348664.m4a",
          "time":"2020-07-10T02:37:44.000Z",
          "srcList":[
             {
                "_id":"5f07d47d7f26d125bfd66668",
                "pos":0,
                "src":"45825"
             }
          ],
          "star":0,
          "len":3
       },
       {
          "_id":"5f07d4587f26d125bfd65742",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348627.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348627.m4a",
          "time":"2020-07-10T02:37:07.000Z",
          "srcList":[
             {
                "_id":"5f07d4587f26d125bfd65743",
                "pos":0.12,
                "src":"45822"
             }
          ],
          "star":0,
          "len":3
       },
       {
          "_id":"5f07d45e7f26d125bfd65bcf",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348623.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348623.m4a",
          "time":"2020-07-10T02:37:03.000Z",
          "srcList":[
             {
                "_id":"5f07d45e7f26d125bfd65bd0",
                "pos":0.08,
                "src":"45825"
             }
          ],
          "star":0,
          "len":14
       },
       {
          "_id":"5f07d4667f26d125bfd65ccc",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9232-1594348622.m4a",
          "filename":"/kcers1b/2020/7/10/9232-1594348622.m4a",
          "time":"2020-07-10T02:37:02.000Z",
          "srcList":[
             {
                "_id":"5f07d4667f26d125bfd65cd2",
                "pos":0.12,
                "src":"1605"
             },
             {
                "_id":"5f07d4667f26d125bfd65cd1",
                "pos":4.18,
                "src":"570"
             },
             {
                "_id":"5f07d4667f26d125bfd65cd0",
                "pos":4.18,
                "src":"1605"
             },
             {
                "_id":"5f07d4667f26d125bfd65ccf",
                "pos":4.18,
                "src":"24243"
             },
             {
                "_id":"5f07d4667f26d125bfd65cce",
                "pos":4.18,
                "src":"570"
             },
             {
                "_id":"5f07d4667f26d125bfd65ccd",
                "pos":4.18,
                "src":"46454"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d4517f26d125bfd65624",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348606.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348606.m4a",
          "time":"2020-07-10T02:36:46.000Z",
          "srcList":[
             {
                "_id":"5f07d4517f26d125bfd65626",
                "pos":3.3,
                "src":"44957"
             },
             {
                "_id":"5f07d4517f26d125bfd65625",
                "pos":3.3,
                "src":"47067"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d4337f26d125bfd64b03",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3280-1594348586.m4a",
          "filename":"/kcers1b/2020/7/10/3280-1594348586.m4a",
          "time":"2020-07-10T02:36:26.000Z",
          "srcList":[
             {
                "_id":"5f07d4337f26d125bfd64b04",
                "pos":0.13,
                "src":"45823"
             }
          ],
          "star":0,
          "len":8
       },
       {
          "_id":"5f07d43c7f26d125bfd64c5f",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348573.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348573.m4a",
          "time":"2020-07-10T02:36:13.000Z",
          "srcList":[
             {
                "_id":"5f07d43c7f26d125bfd64c62",
                "pos":0.12,
                "src":"47067"
             },
             {
                "_id":"5f07d43c7f26d125bfd64c61",
                "pos":2.37,
                "src":"22547"
             },
             {
                "_id":"5f07d43c7f26d125bfd64c60",
                "pos":18.29,
                "src":"64775"
             }
          ],
          "star":0,
          "len":28
       },
       {
          "_id":"5f07d41d7f26d125bfd64876",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348561.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348561.m4a",
          "time":"2020-07-10T02:36:01.000Z",
          "srcList":[
             {
                "_id":"5f07d41d7f26d125bfd64877",
                "pos":0.08,
                "src":"45822"
             }
          ],
          "star":0,
          "len":12
       },
       {
          "_id":"5f07d4687f26d125bfd65d0b",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3728-1594348555.m4a",
          "filename":"/kcers1b/2020/7/10/3728-1594348555.m4a",
          "time":"2020-07-10T02:35:55.000Z",
          "srcList":[
             {
                "_id":"5f07d4687f26d125bfd65d18",
                "pos":0.1,
                "src":"10175"
             },
             {
                "_id":"5f07d4687f26d125bfd65d17",
                "pos":4.79,
                "src":"44998"
             },
             {
                "_id":"5f07d4687f26d125bfd65d16",
                "pos":4.79,
                "src":"10175"
             },
             {
                "_id":"5f07d4687f26d125bfd65d15",
                "pos":4.79,
                "src":"21774"
             },
             {
                "_id":"5f07d4687f26d125bfd65d14",
                "pos":4.79,
                "src":"46883"
             },
             {
                "_id":"5f07d4687f26d125bfd65d13",
                "pos":22.45,
                "src":"23955"
             },
             {
                "_id":"5f07d4687f26d125bfd65d12",
                "pos":27.06,
                "src":"44998"
             },
             {
                "_id":"5f07d4687f26d125bfd65d11",
                "pos":29.61,
                "src":"23955"
             },
             {
                "_id":"5f07d4687f26d125bfd65d10",
                "pos":30.85,
                "src":"10175"
             },
             {
                "_id":"5f07d4687f26d125bfd65d0f",
                "pos":36.33,
                "src":"24092"
             },
             {
                "_id":"5f07d4687f26d125bfd65d0e",
                "pos":36.33,
                "src":"10175"
             },
             {
                "_id":"5f07d4687f26d125bfd65d0d",
                "pos":36.33,
                "src":"44998"
             },
             {
                "_id":"5f07d4687f26d125bfd65d0c",
                "pos":40.71,
                "src":"10175"
             }
          ],
          "star":0,
          "len":41
       },
       {
          "_id":"5f07d4117f26d125bfd640ca",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348551.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348551.m4a",
          "time":"2020-07-10T02:35:51.000Z",
          "srcList":[
             {
                "_id":"5f07d4117f26d125bfd640cd",
                "pos":1.1,
                "src":"23955"
             },
             {
                "_id":"5f07d4117f26d125bfd640cc",
                "pos":2.64,
                "src":"45825"
             },
             {
                "_id":"5f07d4117f26d125bfd640cb",
                "pos":6.84,
                "src":"23955"
             }
          ],
          "star":0,
          "len":8
       },
       {
          "_id":"5f07d4017f26d125bfd638be",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348529.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348529.m4a",
          "time":"2020-07-10T02:35:29.000Z",
          "srcList":[
             {
                "_id":"5f07d4017f26d125bfd638bf",
                "pos":7.22,
                "src":"44998"
             }
          ],
          "star":0,
          "len":7
       },
       {
          "_id":"5f07d3f67f26d125bfd63722",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9232-1594348515.m4a",
          "filename":"/kcers1b/2020/7/10/9232-1594348515.m4a",
          "time":"2020-07-10T02:35:15.000Z",
          "srcList":[
             {
                "_id":"5f07d3f67f26d125bfd63729",
                "pos":0.1,
                "src":"1637"
             },
             {
                "_id":"5f07d3f67f26d125bfd63728",
                "pos":2.94,
                "src":"24243"
             },
             {
                "_id":"5f07d3f67f26d125bfd63727",
                "pos":3.59,
                "src":"570"
             },
             {
                "_id":"5f07d3f67f26d125bfd63726",
                "pos":5.31,
                "src":"1637"
             },
             {
                "_id":"5f07d3f67f26d125bfd63725",
                "pos":6.43,
                "src":"24243"
             },
             {
                "_id":"5f07d3f67f26d125bfd63724",
                "pos":11.88,
                "src":"570"
             },
             {
                "_id":"5f07d3f67f26d125bfd63723",
                "pos":11.99,
                "src":"10175"
             }
          ],
          "star":0,
          "len":12
       },
       {
          "_id":"5f07d3b77f26d125bfd62907",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9264-1594348461.m4a",
          "filename":"/kcers1b/2020/7/10/9264-1594348461.m4a",
          "time":"2020-07-10T02:34:21.000Z",
          "srcList":[
             {
                "_id":"5f07d3b77f26d125bfd62909",
                "pos":0.09,
                "src":"957"
             },
             {
                "_id":"5f07d3b77f26d125bfd62908",
                "pos":4.3,
                "src":"2832"
             }
          ],
          "star":0,
          "len":8
       },
       {
          "_id":"5f07d37e7f26d125bfd61e07",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348403.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348403.m4a",
          "time":"2020-07-10T02:33:23.000Z",
          "srcList":[
             {
                "_id":"5f07d37e7f26d125bfd61e0a",
                "pos":0.11,
                "src":"45822"
             },
             {
                "_id":"5f07d37e7f26d125bfd61e09",
                "pos":5.02,
                "src":"44950"
             },
             {
                "_id":"5f07d37e7f26d125bfd61e08",
                "pos":7.27,
                "src":"11983"
             }
          ],
          "star":0,
          "len":9
       },
       {
          "_id":"5f07d3727f26d125bfd615bd",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348391.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348391.m4a",
          "time":"2020-07-10T02:33:11.000Z",
          "srcList":[
             {
                "_id":"5f07d3727f26d125bfd615c1",
                "pos":0,
                "src":"46745"
             },
             {
                "_id":"5f07d3727f26d125bfd615c0",
                "pos":1.5,
                "src":"21081"
             },
             {
                "_id":"5f07d3727f26d125bfd615bf",
                "pos":5.99,
                "src":"45822"
             },
             {
                "_id":"5f07d3727f26d125bfd615be",
                "pos":7.53,
                "src":"20670"
             }
          ],
          "star":0,
          "len":9
       },
       {
          "_id":"5f07d3607f26d125bfd6131e",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348367.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348367.m4a",
          "time":"2020-07-10T02:32:47.000Z",
          "srcList":[
             {
                "_id":"5f07d3607f26d125bfd61325",
                "pos":0,
                "src":"45822"
             },
             {
                "_id":"5f07d3607f26d125bfd61324",
                "pos":2.34,
                "src":"46745"
             },
             {
                "_id":"5f07d3607f26d125bfd61323",
                "pos":2.75,
                "src":"45822"
             },
             {
                "_id":"5f07d3607f26d125bfd61322",
                "pos":3.88,
                "src":"24243"
             },
             {
                "_id":"5f07d3607f26d125bfd61321",
                "pos":4.89,
                "src":"45822"
             },
             {
                "_id":"5f07d3607f26d125bfd61320",
                "pos":10.33,
                "src":"46745"
             },
             {
                "_id":"5f07d3607f26d125bfd6131f",
                "pos":11.04,
                "src":"24243"
             }
          ],
          "star":0,
          "len":14
       },
       {
          "_id":"5f07d33c7f26d125bfd603f3",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3280-1594348332.m4a",
          "filename":"/kcers1b/2020/7/10/3280-1594348332.m4a",
          "time":"2020-07-10T02:32:12.000Z",
          "srcList":[
             {
                "_id":"5f07d33c7f26d125bfd603f5",
                "pos":0.09,
                "src":"45823"
             },
             {
                "_id":"5f07d33c7f26d125bfd603f4",
                "pos":11.57,
                "src":"22547"
             }
          ],
          "star":0,
          "len":13
       },
       {
          "_id":"5f07d32b7f26d125bfd6016c",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3280-1594348326.m4a",
          "filename":"/kcers1b/2020/7/10/3280-1594348326.m4a",
          "time":"2020-07-10T02:32:06.000Z",
          "srcList":[
             {
                "_id":"5f07d32b7f26d125bfd6016d",
                "pos":0.09,
                "src":"45823"
             }
          ],
          "star":0,
          "len":3
       },
       {
          "_id":"5f07d3267f26d125bfd60089",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3408-1594348322.m4a",
          "filename":"/kcers1b/2020/7/10/3408-1594348322.m4a",
          "time":"2020-07-10T02:32:02.000Z",
          "srcList":[
             {
                "_id":"5f07d3267f26d125bfd6008a",
                "pos":0.12,
                "src":"45826"
             }
          ],
          "star":0,
          "len":3
       },
       {
          "_id":"5f07d33a7f26d125bfd60396",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348319.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348319.m4a",
          "time":"2020-07-10T02:31:59.000Z",
          "srcList":[
             {
                "_id":"5f07d33a7f26d125bfd6039c",
                "pos":0,
                "src":"45822"
             },
             {
                "_id":"5f07d33a7f26d125bfd6039b",
                "pos":2.79,
                "src":"44950"
             },
             {
                "_id":"5f07d33a7f26d125bfd6039a",
                "pos":3.06,
                "src":"45822"
             },
             {
                "_id":"5f07d33a7f26d125bfd60399",
                "pos":3.06,
                "src":"23955"
             },
             {
                "_id":"5f07d33a7f26d125bfd60398",
                "pos":3.06,
                "src":"44950"
             },
             {
                "_id":"5f07d33a7f26d125bfd60397",
                "pos":3.06,
                "src":"23347"
             }
          ],
          "star":0,
          "len":3
       },
       {
          "_id":"5f07d3107f26d125bfd5f7f8",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348298.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348298.m4a",
          "time":"2020-07-10T02:31:38.000Z",
          "srcList":[
             {
                "_id":"5f07d3107f26d125bfd5f7f9",
                "pos":2.33,
                "src":"22371"
             }
          ],
          "star":0,
          "len":5
       },
       {
          "_id":"5f07d3097f26d125bfd5f68c",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348283.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348283.m4a",
          "time":"2020-07-10T02:31:23.000Z",
          "srcList":[
             {
                "_id":"5f07d3097f26d125bfd5f690",
                "pos":0.12,
                "src":"10025"
             },
             {
                "_id":"5f07d3097f26d125bfd5f68f",
                "pos":2.49,
                "src":"45825"
             },
             {
                "_id":"5f07d3097f26d125bfd5f68e",
                "pos":5.53,
                "src":"10025"
             },
             {
                "_id":"5f07d3097f26d125bfd5f68d",
                "pos":5.53,
                "src":"45825"
             }
          ],
          "star":0,
          "len":6
       },
       {
          "_id":"5f07d30a7f26d125bfd5f6eb",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348282.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348282.m4a",
          "time":"2020-07-10T02:31:22.000Z",
          "srcList":[
             {
                "_id":"5f07d30a7f26d125bfd5f6ee",
                "pos":0,
                "src":"45822"
             },
             {
                "_id":"5f07d30a7f26d125bfd5f6ed",
                "pos":2.75,
                "src":"47487"
             },
             {
                "_id":"5f07d30a7f26d125bfd5f6ec",
                "pos":4.58,
                "src":"45822"
             }
          ],
          "star":0,
          "len":15
       },
       {
          "_id":"5f07d3147f26d125bfd5f849",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3344-1594348280.m4a",
          "filename":"/kcers1b/2020/7/10/3344-1594348280.m4a",
          "time":"2020-07-10T02:31:20.000Z",
          "srcList":[
             {
                "_id":"5f07d3147f26d125bfd5f851",
                "pos":0.1,
                "src":"45824"
             },
             {
                "_id":"5f07d3147f26d125bfd5f850",
                "pos":6.24,
                "src":"44821"
             },
             {
                "_id":"5f07d3147f26d125bfd5f84f",
                "pos":6.24,
                "src":"45824"
             },
             {
                "_id":"5f07d3147f26d125bfd5f84e",
                "pos":6.24,
                "src":"45825"
             },
             {
                "_id":"5f07d3147f26d125bfd5f84d",
                "pos":6.24,
                "src":"44821"
             },
             {
                "_id":"5f07d3147f26d125bfd5f84c",
                "pos":6.24,
                "src":"45019"
             },
             {
                "_id":"5f07d3147f26d125bfd5f84b",
                "pos":6.24,
                "src":"45824"
             },
             {
                "_id":"5f07d3147f26d125bfd5f84a",
                "pos":6.24,
                "src":"16551"
             }
          ],
          "star":0,
          "len":6
       },
       {
          "_id":"5f07d2f87f26d125bfd5f03b",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3344-1594348273.m4a",
          "filename":"/kcers1b/2020/7/10/3344-1594348273.m4a",
          "time":"2020-07-10T02:31:13.000Z",
          "srcList":[
             {
                "_id":"5f07d2f87f26d125bfd5f03c",
                "pos":0.13,
                "src":"45019"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d30c7f26d125bfd5f756",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3408-1594348262.m4a",
          "filename":"/kcers1b/2020/7/10/3408-1594348262.m4a",
          "time":"2020-07-10T02:31:02.000Z",
          "srcList":[
             {
                "_id":"5f07d30c7f26d125bfd5f75e",
                "pos":4.11,
                "src":"45826"
             },
             {
                "_id":"5f07d30c7f26d125bfd5f75d",
                "pos":4.11,
                "src":"46745"
             },
             {
                "_id":"5f07d30c7f26d125bfd5f75c",
                "pos":4.11,
                "src":"45826"
             },
             {
                "_id":"5f07d30c7f26d125bfd5f75b",
                "pos":4.11,
                "src":"21037"
             },
             {
                "_id":"5f07d30c7f26d125bfd5f75a",
                "pos":4.11,
                "src":"45826"
             },
             {
                "_id":"5f07d30c7f26d125bfd5f759",
                "pos":4.11,
                "src":"46745"
             },
             {
                "_id":"5f07d30c7f26d125bfd5f758",
                "pos":9.17,
                "src":"45826"
             },
             {
                "_id":"5f07d30c7f26d125bfd5f757",
                "pos":9.17,
                "src":"46745"
             }
          ],
          "star":0,
          "len":9
       },
       {
          "_id":"5f07d2e47f26d125bfd5e713",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348237.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594348237.m4a",
          "time":"2020-07-10T02:30:37.000Z",
          "srcList":[
             {
                "_id":"5f07d2e47f26d125bfd5e717",
                "pos":0,
                "src":"45822"
             },
             {
                "_id":"5f07d2e47f26d125bfd5e716",
                "pos":0.63,
                "src":"22547"
             },
             {
                "_id":"5f07d2e47f26d125bfd5e715",
                "pos":5.01,
                "src":"45822"
             },
             {
                "_id":"5f07d2e47f26d125bfd5e714",
                "pos":16.73,
                "src":"10922"
             }
          ],
          "star":0,
          "len":20
       },
       {
          "_id":"5f07d2d77f26d125bfd5e524",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3280-1594348202.m4a",
          "filename":"/kcers1b/2020/7/10/3280-1594348202.m4a",
          "time":"2020-07-10T02:30:02.000Z",
          "srcList":[
             {
                "_id":"5f07d2d77f26d125bfd5e52c",
                "pos":0.09,
                "src":"45823"
             },
             {
                "_id":"5f07d2d77f26d125bfd5e52b",
                "pos":5.59,
                "src":"46335"
             },
             {
                "_id":"5f07d2d77f26d125bfd5e52a",
                "pos":5.59,
                "src":"45006"
             },
             {
                "_id":"5f07d2d77f26d125bfd5e529",
                "pos":5.59,
                "src":"37729"
             },
             {
                "_id":"5f07d2d77f26d125bfd5e528",
                "pos":5.59,
                "src":"46335"
             },
             {
                "_id":"5f07d2d77f26d125bfd5e527",
                "pos":5.59,
                "src":"23347"
             },
             {
                "_id":"5f07d2d77f26d125bfd5e526",
                "pos":6.85,
                "src":"46335"
             },
             {
                "_id":"5f07d2d77f26d125bfd5e525",
                "pos":10.12,
                "src":"45006"
             }
          ],
          "star":0,
          "len":10
       },
       {
          "_id":"5f07d2a97f26d125bfd5d53b",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3280-1594348186.m4a",
          "filename":"/kcers1b/2020/7/10/3280-1594348186.m4a",
          "time":"2020-07-10T02:29:46.000Z",
          "srcList":[
             {
                "_id":"5f07d2a97f26d125bfd5d540",
                "pos":0,
                "src":"45823"
             },
             {
                "_id":"5f07d2a97f26d125bfd5d53f",
                "pos":3.91,
                "src":"44933"
             },
             {
                "_id":"5f07d2a97f26d125bfd5d53e",
                "pos":4.14,
                "src":"45823"
             },
             {
                "_id":"5f07d2a97f26d125bfd5d53d",
                "pos":4.14,
                "src":"44933"
             },
             {
                "_id":"5f07d2a97f26d125bfd5d53c",
                "pos":4.14,
                "src":"1751"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d2877f26d125bfd5cc9a",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3280-1594348160.m4a",
          "filename":"/kcers1b/2020/7/10/3280-1594348160.m4a",
          "time":"2020-07-10T02:29:20.000Z",
          "srcList":[
             {
                "_id":"5f07d2877f26d125bfd5cc9b",
                "pos":0.09,
                "src":"45823"
             }
          ],
          "star":0,
          "len":5
       },
       {
          "_id":"5f07d2847f26d125bfd5cc31",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9232-1594348157.m4a",
          "filename":"/kcers1b/2020/7/10/9232-1594348157.m4a",
          "time":"2020-07-10T02:29:17.000Z",
          "srcList":[
             {
                "_id":"5f07d2847f26d125bfd5cc32",
                "pos":0.12,
                "src":"570"
             }
          ],
          "star":0,
          "len":5
       },
       {
          "_id":"5f07d27d7f26d125bfd5c7ba",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9232-1594348140.m4a",
          "filename":"/kcers1b/2020/7/10/9232-1594348140.m4a",
          "time":"2020-07-10T02:29:00.000Z",
          "srcList":[
             {
                "_id":"5f07d27d7f26d125bfd5c7be",
                "pos":0,
                "src":"1574"
             },
             {
                "_id":"5f07d27d7f26d125bfd5c7bd",
                "pos":0.94,
                "src":"22547"
             },
             {
                "_id":"5f07d27d7f26d125bfd5c7bc",
                "pos":5.73,
                "src":"570"
             },
             {
                "_id":"5f07d27d7f26d125bfd5c7bb",
                "pos":8.81,
                "src":"1574"
             }
          ],
          "star":0,
          "len":15
       },
       {
          "_id":"5f07d2707f26d125bfd5c63b",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3344-1594348134.m4a",
          "filename":"/kcers1b/2020/7/10/3344-1594348134.m4a",
          "time":"2020-07-10T02:28:54.000Z",
          "srcList":[
             {
                "_id":"5f07d2707f26d125bfd5c63c",
                "pos":0.09,
                "src":"45824"
             }
          ],
          "star":0,
          "len":7
       },
       {
          "_id":"5f07d24d7f26d125bfd5b7a4",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9232-1594348089.m4a",
          "filename":"/kcers1b/2020/7/10/9232-1594348089.m4a",
          "time":"2020-07-10T02:28:09.000Z",
          "srcList":[
             {
                "_id":"5f07d24d7f26d125bfd5b7a8",
                "pos":0.12,
                "src":"1565"
             },
             {
                "_id":"5f07d24d7f26d125bfd5b7a7",
                "pos":4.45,
                "src":"570"
             },
             {
                "_id":"5f07d24d7f26d125bfd5b7a6",
                "pos":6.7,
                "src":"1565"
             },
             {
                "_id":"5f07d24d7f26d125bfd5b7a5",
                "pos":12.52,
                "src":"570"
             }
          ],
          "star":0,
          "len":13
       },
       {
          "_id":"5f07d2487f26d125bfd5b6f2",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3344-1594348071.m4a",
          "filename":"/kcers1b/2020/7/10/3344-1594348071.m4a",
          "time":"2020-07-10T02:27:51.000Z",
          "srcList":[
             {
                "_id":"5f07d2487f26d125bfd5b6f4",
                "pos":0.08,
                "src":"45824"
             },
             {
                "_id":"5f07d2487f26d125bfd5b6f3",
                "pos":21.63,
                "src":"23347"
             }
          ],
          "star":0,
          "len":30
       },
       {
          "_id":"5f07d2307f26d125bfd5b32f",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9232-1594348058.m4a",
          "filename":"/kcers1b/2020/7/10/9232-1594348058.m4a",
          "time":"2020-07-10T02:27:38.000Z",
          "srcList":[
             {
                "_id":"5f07d2307f26d125bfd5b333",
                "pos":0.1,
                "src":"570"
             },
             {
                "_id":"5f07d2307f26d125bfd5b332",
                "pos":1.93,
                "src":"1690"
             },
             {
                "_id":"5f07d2307f26d125bfd5b331",
                "pos":9.92,
                "src":"23955"
             },
             {
                "_id":"5f07d2307f26d125bfd5b330",
                "pos":13.23,
                "src":"570"
             }
          ],
          "star":0,
          "len":13
       },
       {
          "_id":"5f07d2277f26d125bfd5b1b3",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348057.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348057.m4a",
          "time":"2020-07-10T02:27:37.000Z",
          "srcList":[
             {
                "_id":"5f07d2277f26d125bfd5b1b5",
                "pos":0,
                "src":"47020"
             },
             {
                "_id":"5f07d2277f26d125bfd5b1b4",
                "pos":8.1,
                "src":"44998"
             }
          ],
          "star":0,
          "len":12
       },
       {
          "_id":"5f07d2187f26d125bfd5abf6",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9232-1594348050.m4a",
          "filename":"/kcers1b/2020/7/10/9232-1594348050.m4a",
          "time":"2020-07-10T02:27:30.000Z",
          "srcList":[
             {
                "_id":"5f07d2187f26d125bfd5abf7",
                "pos":0.07,
                "src":"1690"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d2237f26d125bfd5b0ef",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3408-1594348048.m4a",
          "filename":"/kcers1b/2020/7/10/3408-1594348048.m4a",
          "time":"2020-07-10T02:27:28.000Z",
          "srcList":[
             {
                "_id":"5f07d2237f26d125bfd5b0f6",
                "pos":0.09,
                "src":"45826"
             },
             {
                "_id":"5f07d2237f26d125bfd5b0f5",
                "pos":2.45,
                "src":"47090"
             },
             {
                "_id":"5f07d2237f26d125bfd5b0f4",
                "pos":4.88,
                "src":"45826"
             },
             {
                "_id":"5f07d2237f26d125bfd5b0f3",
                "pos":5.71,
                "src":"23347"
             },
             {
                "_id":"5f07d2237f26d125bfd5b0f2",
                "pos":8.77,
                "src":"47090"
             },
             {
                "_id":"5f07d2237f26d125bfd5b0f1",
                "pos":8.77,
                "src":"45826"
             },
             {
                "_id":"5f07d2237f26d125bfd5b0f0",
                "pos":8.77,
                "src":"23955"
             }
          ],
          "star":0,
          "len":9
       },
       {
          "_id":"5f07d2107f26d125bfd5aa81",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3408-1594348041.m4a",
          "filename":"/kcers1b/2020/7/10/3408-1594348041.m4a",
          "time":"2020-07-10T02:27:21.000Z",
          "srcList":[
             {
                "_id":"5f07d2107f26d125bfd5aa82",
                "pos":2.21,
                "src":"64742"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d2157f26d125bfd5ab7a",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594348034.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594348034.m4a",
          "time":"2020-07-10T02:27:14.000Z",
          "srcList":[
             {
                "_id":"5f07d2157f26d125bfd5ab80",
                "pos":0.13,
                "src":"47020"
             },
             {
                "_id":"5f07d2157f26d125bfd5ab7f",
                "pos":2.09,
                "src":"45825"
             },
             {
                "_id":"5f07d2157f26d125bfd5ab7e",
                "pos":4.04,
                "src":"47020"
             },
             {
                "_id":"5f07d2157f26d125bfd5ab7d",
                "pos":10.61,
                "src":"44998"
             },
             {
                "_id":"5f07d2157f26d125bfd5ab7c",
                "pos":11.26,
                "src":"47020"
             },
             {
                "_id":"5f07d2157f26d125bfd5ab7b",
                "pos":11.26,
                "src":"46443"
             }
          ],
          "star":0,
          "len":11
       },
       {
          "_id":"5f07d2017f26d125bfd5a800",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-9232-1594348023.m4a",
          "filename":"/kcers1b/2020/7/10/9232-1594348023.m4a",
          "time":"2020-07-10T02:27:03.000Z",
          "srcList":[
             {
                "_id":"5f07d2017f26d125bfd5a802",
                "pos":3.19,
                "src":"24161"
             },
             {
                "_id":"5f07d2017f26d125bfd5a801",
                "pos":4.48,
                "src":"570"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d1cc7f26d125bfd59cc9",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594347974.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594347974.m4a",
          "time":"2020-07-10T02:26:14.000Z",
          "srcList":[
             {
                "_id":"5f07d1cc7f26d125bfd59ccb",
                "pos":0,
                "src":"10175"
             },
             {
                "_id":"5f07d1cc7f26d125bfd59cca",
                "pos":0.78,
                "src":"23347"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d1c17f26d125bfd597cb",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594347952.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594347952.m4a",
          "time":"2020-07-10T02:25:52.000Z",
          "srcList":[
             {
                "_id":"5f07d1c17f26d125bfd597d1",
                "pos":0.11,
                "src":"10175"
             },
             {
                "_id":"5f07d1c17f26d125bfd597d0",
                "pos":3.19,
                "src":"44904"
             },
             {
                "_id":"5f07d1c17f26d125bfd597cf",
                "pos":4.31,
                "src":"23347"
             },
             {
                "_id":"5f07d1c17f26d125bfd597ce",
                "pos":7.09,
                "src":"45825"
             },
             {
                "_id":"5f07d1c17f26d125bfd597cd",
                "pos":7.63,
                "src":"22547"
             },
             {
                "_id":"5f07d1c17f26d125bfd597cc",
                "pos":10.76,
                "src":"10175"
             }
          ],
          "star":0,
          "len":14
       },
       {
          "_id":"5f07d1a07f26d125bfd59315",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594347928.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594347928.m4a",
          "time":"2020-07-10T02:25:28.000Z",
          "srcList":[
             {
                "_id":"5f07d1a07f26d125bfd59317",
                "pos":0,
                "src":"46407"
             },
             {
                "_id":"5f07d1a07f26d125bfd59316",
                "pos":3.29,
                "src":"45822"
             }
          ],
          "star":0,
          "len":6
       },
       {
          "_id":"5f07d1b17f26d125bfd59578",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-1680-1594347918.m4a",
          "filename":"/kcers1b/2020/7/10/1680-1594347918.m4a",
          "time":"2020-07-10T02:25:18.000Z",
          "srcList":[
             {
                "_id":"5f07d1b17f26d125bfd5957c",
                "pos":0.11,
                "src":"45825"
             },
             {
                "_id":"5f07d1b17f26d125bfd5957b",
                "pos":5.32,
                "src":"10175"
             },
             {
                "_id":"5f07d1b17f26d125bfd5957a",
                "pos":7.81,
                "src":"44904"
             },
             {
                "_id":"5f07d1b17f26d125bfd59579",
                "pos":10.89,
                "src":"45825"
             }
          ],
          "star":0,
          "len":32
       },
       {
          "_id":"5f07d18c7f26d125bfd586ca",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3344-1594347909.m4a",
          "filename":"/kcers1b/2020/7/10/3344-1594347909.m4a",
          "time":"2020-07-10T02:25:09.000Z",
          "srcList":[
             {
                "_id":"5f07d18c7f26d125bfd586cb",
                "pos":0.1,
                "src":"894"
             }
          ],
          "star":0,
          "len":4
       },
       {
          "_id":"5f07d1927f26d125bfd58dc0",
          "talkgroupNum":1680,
          "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594347907.m4a",
          "filename":"/kcers1b/2020/7/10/3312-1594347907.m4a",
          "time":"2020-07-10T02:25:07.000Z",
          "srcList":[
             {
                "_id":"5f07d1927f26d125bfd58dc1",
                "pos":0.11,
                "src":"45822"
             }
          ],
          "star":0,
          "len":13
       }
    ];


function get_calls(query, numResults, res) {

    var calls = [];
    var fields = {
        _id: true,
        talkgroupNum: true,
        path: true,
        name: true,
        time: true,
        srcList: true,
        star: true,
        len: true,
        url: true
    };

    for (let i = 0; i < 50; i++) {
        calls.push( {
            "_id": Math.floor((Math.random() * 100) + 1).toString(),
            "talkgroupNum":1904,
            "url":"https://s3.us-west-1.wasabisys.com/openmhz-west/media/kcers1b-3312-1594348573.m4a",
            "filename":"/kcers1b/2020/7/10/3312-1594348573.m4a?c=" + Math.floor((Math.random() * 10000) + 1),
            "time":1594516499280,
            "srcList":[
               {
                  "_id":"5f07d43c7f26d125bfd64c62",
                  "pos":0.12,
                  "src":"47067"
               },
               {
                  "_id":"5f07d43c7f26d125bfd64c61",
                  "pos":2.37,
                  "src":"22547"
               },
               {
                  "_id":"5f07d43c7f26d125bfd64c60",
                  "pos":18.29,
                  "src":"64775"
               }
            ],
            "star":0,
            "len":28
         })
       }
        res.contentType('json');
        res.send(JSON.stringify({
            calls: calls,
            direction: query.direction
        }));


}

function build_filter(filter_type, code, start_time, direction, shortName, numResults, starred, res) {
    var filter = {};
    var query = {};
    var FilterType = {
        All: 0,
        Talkgroup: 1,
        Group: 2,
        Unit: 3
    };
/* removed to see if it helps queries
    if (starred) {
        filter.star = {
            $gt: 0
        };
    }*/

    if (start_time) {
        var start = new Date(start_time);
        if (direction == 'newer') {
            filter.time = {
                $gt: start
            };
        } else {
            filter.time = {
                $lt: start
            };
        }

    }
    /*
    filter.len = {
        $gte: -1.0
    };*/


    var sort_order = {};
    if (direction == 'newer') {
        sort_order['time'] = 1;
    } else {
        sort_order['time'] = -1;
    }

    // make sure the shortName for the system is included in the query
    filter.shortName = shortName;

    query['direction'] = direction;
    query['sort_order'] = sort_order;

    if (filter_type) {
        if ((filter_type == "group") && code && (code.indexOf(',') == -1)) {
            db.get().collection("groups", function(err, groupCollection) {
              if (err || !groupCollection) {
                  console.warn("[" + shortName + "] Error - build_filter() Group Collection does not exist " + err);
                  res.contentType('json');
                  res.send(JSON.stringify( {
                      message: 'That Group ID doesnt exist.'
                  }));
                  return;
                }
                groupCollection.findOne({
                    'shortName': shortName,
                    '_id': ObjectID.createFromHexString(code)
                }, function(err, group) {
                    if (err) {
                        console.warn("[" + shortName + "] Error - build_filter() Group ID does not exist " + err);
                        res.contentType('json');
                        res.send(JSON.stringify( {
                            message: 'That Group ID doesnt exist.'
                        }));
                    } else if (!group) {
                      console.warn("[" + shortName + "] Error - build_filter() group is null " + err);
                      res.contentType('json');
                      res.send(JSON.stringify({
                          message: 'That Group ID doesnt exist.'
                      }));
                    }  else{
                        filter.talkgroupNum = {
                            $in: group.talkgroups
                        };
                        query['filter'] = filter;

                        get_calls(query, numResults, res);
                    }
                });
            });
        } else {
            if ((filter_type == "talkgroup") || (filter_type == "group")) {
                if (code) {
                    var codeArray = code.split(',').map(function(item) {
                        return parseInt(item, 10);
                    });
                    filter.talkgroupNum = {
                        $in: codeArray
                    };
                }
            }

            if (filter_type == "unit") {
                if (code) {
                    var codeArray = code.split(',').map(function(item) {
                        return parseInt(item, 10);
                    });
                    filter.srcListv = {
                        $in: codeArray
                    };
                }
            }
            query['filter'] = filter;

            get_calls(query, numResults, res);
        }
    } else {
        query['filter'] = filter;
        get_calls(query, numResults, res);
    }
}


exports.get_card = function(req, res) {
    var objectId = req.params.id;
    try {
        var o_id = ObjectID.createFromHexString(objectId);
    } catch (err) {
        console.warn("Error - /card/:id generating ObjectID " + err);
        res.status(500);
        res.send(JSON.stringify({
            error: err,
            "_id": objectId
        }));
        return;
    }
    db.get().collection('calls', function(err, transCollection) {
        transCollection.findOne({
                '_id': o_id
            },
            function(err, item) {
                //console.log(util.inspect(item));
                if (item) {
                    var time = new Date(item.time);
                    var timeString = time.toLocaleTimeString("en-US");
                    var dateString = time.toDateString();
                    res.render('card', {
                        item: item,
                        channel: channels[item.talkgroupNum],
                        time: timeString,
                        date: dateString
                    });
                } else {
                    console.warn("Error - /card/:id Could not find Item " + err);
                    res.send(404, 'Sorry, we cannot find that!');
                }
            });
    });
}

function package_call(item) {
    var time = new Date(item.time);
    var timeString = time.toLocaleTimeString("en-US");
    var dateString = time.toDateString();
    call = {
        _id: item._id.toHexString(),
        shortName: item.shortName,
        talkgroupNum: item.talkgroupNum,
        filename: item.path + item.name,
        url: item.url,
        time: item.time,
        timeString: timeString,
        dateString: dateString,
        path: item.path,
        name: item.name,
        freq: item.freq,
        srcList: item.srcList,
        freqList: item.freqList,
        star: item.star,
        len: Math.round(item.len)
    };
    return call;
}




exports.add_star = function(req, res, next) {
    var objectId = req.params.id;
    try {
        var o_id = ObjectID.createFromHexString(objectId);
    } catch (err) {
        console.warn("[" + req.params.shortName + "] Error - /:shortName/call/:id generating ObjectID " + err);
        res.status(500);
        res.send(JSON.stringify({
            success: false,
            message: err,
            "_id": objectId
        }));
        return;
    }
    Call.findOneAndUpdate({ _id: objectId }, { $inc: { star: 1 } }, {new: true },function(err, item) {
        if (err) {
            res.status(500);
            res.send(JSON.stringify({
                success: false,
                message: err,
                "_id": objectId
            }));
       } else {
            var call = package_call(item);
            req.call = call;
            res.send(JSON.stringify({
                success: true,
                call: call
            }));
            next();      
       }
    })
}


exports.get_call = function(req, res) {
    var objectId = req.params.id;
    try {
        var o_id = ObjectID.createFromHexString(objectId);
    } catch (err) {
        console.warn("[" + req.params.shortName + "] Error - /:shortName/call/:id generating ObjectID " + err);
        res.status(500);
        res.send(JSON.stringify({
            success: false,
            error: err,
            "_id": objectId
        }));
        return;
    }
    db.get().collection('calls', function(err, transCollection) {
        transCollection.findOne({
                '_id': o_id
            },
            function(err, item) {
                if (item) {
                    var call = package_call(item);
                    res.contentType('json');
                    res.send(JSON.stringify({
                        success: true,
                        call: call})
                    );

                } else {
                    console.warn("[" + req.params.shortName + "] Error - /:shortName/call/:id Could not find item " + err + " ID: " + objectId);
                    res.status(404);
                    res.send(JSON.stringify({
                        success: false,
                        error: err,
                        "_id": objectId
                    }));
                }
            });
    });
}


exports.get_latest_calls = function(req, res) {
    var filter_code = req.query["filter-code"];
    var filter_type = req.query["filter-type"];
    var starred = req.query["filter-starred"] === 'true'?true:false;
    var short_name = req.params.shortName.toLowerCase();
    //console.log("[" + short_name + "] Latest -  Call Get Filter code: " + filter_code + " Filter Type: " + filter_type );

    build_filter(filter_type, filter_code, null, 'older', short_name, 1, starred, res);
}


exports.get_next_calls = function(req, res) {
    var filter_code = req.query["filter-code"];
    var filter_type = req.query["filter-type"];
    var starred = req.query["filter-starred"] === 'true'?true:false;
    var start_time = parseInt(req.query["time"]);
    var short_name = req.params.shortName.toLowerCase();
    //console.log("[" + short_name + "] Next Calls - time: " + start_time + " Filter code: " + filter_code + " Filter Type: " + filter_type);

    build_filter(filter_type, filter_code, start_time, 'newer', short_name, 1, starred, res);
}

exports.get_newer_calls = function(req, res) {
    var filter_code = req.query["filter-code"];
    var filter_type = req.query["filter-type"];
    var starred = req.query["filter-starred"] === 'true'?true:false;
    var start_time = parseInt(req.query["time"]);
    var short_name = req.params.shortName.toLowerCase();
    //console.log("[" + short_name + "] Newer Calls - time: " + start_time + " Filter code: " + filter_code + " Filter Type: " + filter_type );

    build_filter(filter_type, filter_code, start_time, 'newer', short_name, defaultNumResults, starred, res);
}

exports.get_older_calls = function(req, res) {
    var filter_code = req.query["filter-code"];
    var filter_type = req.query["filter-type"];
    var starred = req.query["filter-starred"] === 'true'?true:false;
    var start_time = parseInt(req.query["time"]);
    var short_name = req.params.shortName.toLowerCase();
    //console.log("[" + short_name + "] Older Calls - time: " + start_time + " Filter code: " + filter_code + " Filter Type: " + filter_type);

    build_filter(filter_type, filter_code, start_time, 'older', short_name, defaultNumResults, starred, res);  
}


//Delete this after I fix the iPhone app
exports.get_iphone_calls = function(req, res) {
    var filter_code = req.query["filter-code"];
    var filter_type = req.query["filter-type"];
    var starred = req.query["filter-starred"] === 'true'?true:false;
    var start_time = parseInt(req.params.time);
    var short_name = req.params.shortName.toLowerCase();
    //console.log("[" + short_name + "] iPhone Newer Calls - time: " + start_time + " Filter code: " + filter_code + " Filter Type: " + filter_type);

    build_filter(filter_type, filter_code, start_time, 'older', short_name, defaultNumResults, starred, res);
}

exports.get_calls = function(req, res) {
    var filter_code = req.query["filter-code"];
    var filter_type = req.query["filter-type"];
    var starred = req.query["filter-starred"] === 'true'?true:false;
    var short_name = req.params.shortName.toLowerCase();
    //console.log("[" + short_name + "] Inital Calls -  Call Get Filter code: " + filter_code + " Filter Type: " + filter_type);

    build_filter(filter_type, filter_code, null, 'older', short_name, defaultNumResults, starred, res);
}
