import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import fileLoyaltyOffers from "./data/loyaltyOffers.json"

const initialMarketData = {
  "0": {
    "buy": {
      "weightedAverage": "0.0",
      "max": "0.0",
      "min": "0.0",
      "stddev": "0.0",
      "median": "0.0",
      "volume": "0.0",
      "orderCount": "0",
      "percentile": "0.0"
    },
    "sell": {
      "weightedAverage": "0.0",
      "max": "0.0",
      "min": "0.0",
      "stddev": "0.0",
      "median": "0.0",
      "volume": "0.0",
      "orderCount": "0",
      "percentile": "0.0"
    }
  }
}

const firstMarketDataHalf = "https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,266,267,377,393,399,434,439,447,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,501,503,520,523,526,529,530,533,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,577,578,584,587,591,594,602,609,620,621,622,625,626,631,634,638,639,640,641,642,643,644,645,1185,1195,1197,1201,1244,1264,1284,1294,1304,1317,1333,1353,1445,1539,1547,1551,1557,1563,1808,1875,1948,1955,1956,1957,1958,1973,1977,1986,1998,2006,2018,2020,2046,2103,2161,2173,2178,2180,2182,2183,2188,2193,2203,2289,2291,2293,2295,2331,2363,2444,2454,2464,2476,2486,2506,2508,2510,2512,2514,2516,2529,2537,2545,2603,3077,3078,3079,3080,3081,3084,3085,3086,3087,3088,3089,3092,3093,3094,3095,3096,3097,3100,3101,3102,3103,3104,3105,3108,3109,3110,3111,3112,3113,3116,3117,3118,3119,3120,3121,3124,3125,3126,3127,3128,3129,3132,3133,3134,3135,3136,3137,3140,3141,3142,3143,3144,3145,3148,3149,3150,3151,3152,3153,3156,3157,3158,3159,3160,3161,3164,3165,3166,3167,3168,3169,3172,3173,3174,3175,3176,3177,3180,3181,3182,3183,3185,3188,3189,3190,3191,3192,3193,3194,3195,3196,3197,3198,3199,3200,3201,3202,3203,3204,3205,3206,3207,3208,3209,3210,3211,3212,3213,3214,3215,3216,3217,3220,3221,3222,3223,3224,3225,3226,3227,3228,3229,3230,3231,3232,3233,3234,3235,3236,3237,3238,3239,3240,3241,3242,3246,3247,3248,3249,3250,3251,3252,3253,3254,3255,3256,3257,3258,3262,3263,3264,3265,3266,3267,3268,3269,3270,3271,3272,3273,3274,3275,3276,3277,3278,3279,3280,3281,3282,3283,3284,3287,3288,3289,3290,3291,3292,3299,3414,3415,3470,3471,3474,3475,3476,3477,3478,3479,3481,3482,3528,3535,3537,3538,3543,3545,3547,3552,3554,3557,3560,3562,3564,3566,3570,3572,3574,3576,3580,3766,3829,3839,3887,3893,3894,3895,3937,3941,3947,3953,3963,3977,3981,3987,3993,4156,4157,4158,4164,4240,4241,4242,4243,4393,9899,9941,9942,9943,9944,9956,9957,10204,10208,10209,10212,10213,10216,10217,10221,10222,10225,10226,10228,10244,10629,10678,10836,10838,10840,11082,11083,11084,11217,11227,11247,11257,11267,11277,11279,11283,11285,11287,11289,11293,11295,11297,11299,11301,11303,11305,11370,11561,11563,12052,12054,12056,12066,12108,12201,12202,12203,12204,12205,12206,12207,12208,12209,12210,12211,12212,12213,12214,12215,12217,12225,12257,12261,12265,12269,12274,12344,12354,12484,12485,12486,12487,12528,12533,12537,12538,12539,12542,12543,12545,12547,12548,12550,12551,12709,13166,13209,13216,13217,13218,13219,13220,13221,13222,13223,13224,13225,13226,13227,13228,13229,13230,13231,13232,13233,13234,13235,13236,13237,13238,13239,13240,13241,13242,13243,13244,13245,13246,13247,13248,13249,13250,13251,13252,13253,13254,13255,13256,13257,13258,13259,13260,13261,13262,13263,13265,13283,13284,13285,13286,13287,13320,14292,14295,14296,14297,14298,14299,15508,15510,15590,15592,15593,15594,15599,15600,15601,15602,15604,15605,15610,15612,15613,15614,15615,15623,15628,15629,15630,15631,15632,15641,15645,15646,15656,15660,15661,15669,15672,15673,15675,15676,15677,15678,15681,15682,15683,15684,15685,15686,15687,15688,15689,15690,15691,15692,15693,15694,15695,15696,15697,15698,15699,15700,15701,15702,15703,15704,15705,15706,15707,15708,15709,15710,15711,15712,15713,15714,15715,15716,15717,15718,15719,15720,15721,15722,15723,15724,15725,15726,15727,15728,15729,15730,15731,15732,15733,15734,15735,15736,15737,15738,15739,15740,15741,15742,15743,15744,15745,15746,15747,15748,15749,15750,15751,15752,15753,15754,15755,15756,15757,15758,15759,15760,15761,15762,15764,15765,15766,15767,15768,15769,15770,15771,15772,15773,15776,15777,15778,15779,15780,15781,15784,15785,15786,15787,15788,15789,15790,15791,15792,15793,15794,15795,15796,15797,15798,15799,15800,15801,15802,15803,15804,15805,15806,15807,15808,15809,15810,15811,15812,15813,15814,15815,15816,15817,15818,15819,15820,15821,15822,15823,15824,15825,15826,15827,15828,15829,15830,15831,15832,15833,15834,15835,15836,15837,15838,15839,15840,15841,15842,15843,15844,15845,15846,15847,15848,15849,15850,15851,15852,15853,15854,15855,15856,15857,15858,15859,15860,15861,15862,15863,15864,15865,15866,15867,15868,15869,15870,15871,15872,15873,15874,15875,15876,15877,15878,15879,15880,15881,15882,15883,15884,15885,15886,15887,15888,15889,15890,15891,15892,15893,15894,15895,15896,15897,15898,15899,15900,15901,15902,15903,15904,15905,15906,15907,15908,15909,15910,15911,15912,15913,15914,15915,15916,15917,15918,15919,15920,15921,15922,15923,15924,15925,15926,15929,15930,15931,15932,15935,15936,15937,15938,15939,15940,15941,15942,15945,15946,15947,15948,15949,15950,15953,15954,15955,15956,15957,15958,15961,15962,15963,15964,15965,15966,15967,15968,15981,15992,15994,15998,15999,16000,16001,16002,16003,16004,16005,16006,16008,16009,16046,16047,16048,16049,16050,16051,16052,16053,16054,16055,16056,16057,16058,16059,16060,16061,16062,16063,16064,16065,16066,16067,16068,16181,16183,16189,16229,16245,16246,16247,16248,16249,16278,17190,17192,17196,17206,17209,17211,17216,17217,17218,17219,17221,17222,17223,17226,17230,17239,17244,17248,17251,17255,17258,17260,17263,17266,17267,17270,17271,17272,17291,17293,17295,17299,17305,17482,17484,17485,17486,17487,17488,17489,17490,17491,17492,17493,17494,17495,17496,17497,17498,17499,17500,17501,17502,17503,17504,17505,17506,17507,17508,17509,17510,17512,17514,17516,17518,17520,17521,17526,17527,17528,17529,17536,17538,17539,17540,17541,17542,17543,17544,17545,17546,17547,17548,17549,17550,17551,17552,17553,17554,17555,17556,17557,17558,17559,17561,17619,17620,17623,17624,17630,17634,17635,17636,17637,17639,17643,17646,17647,17648,17650,17652,17654,17656,17658,17660,17662,17664,17666,17668,17670,17672,17674,17676,17678,17680,17682,17684,17686,17688,17690,17692,17694,17703,17704,17709,17710,17713,17714,17715,17716,17718,17719,17720,17721,17722,17723,17726,17727,17728,17729,17732,17733,17736,17737,17738,17739,17740,17741,17743,17793,17794,17795,17812,17813,17814,17815,17816,17817,17832,17833,17834,17835,17836,17837,17838,17839,17841,17842,17843,17844,17848,17849,17850,17857,17859,17861,17863,17871,17918,17919,17920,17921,17922,17923"
const secondMarketDataHalf = "https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=17924,17925,17926,17927,17928,17929,17930,17931,17932,17933,17938,18639,18655,18657,19534,19535,19536,19537,19538,19539,19540,19547,19548,19549,19550,19551,19553,19554,19555,19556,19684,19685,19686,19687,19688,19689,19690,19691,19692,19693,19694,19695,19696,19697,19698,19699,19700,19962,19964,19966,19968,19970,19972,19974,19976,19978,19980,19982,19984,19986,19988,19990,19992,19994,19996,19998,20000,20002,20004,20006,20008,20010,20012,20014,20016,20018,20020,20022,20024,20026,20028,20030,20032,20034,20036,20038,20040,20043,20045,20047,20049,20051,20053,20055,20057,20121,20138,20157,20158,20159,20160,20161,20171,20172,20209,20210,20211,20212,20213,20306,20307,20308,20410,20411,20412,20413,20414,20415,20416,20417,20418,20419,20420,20421,20423,20424,20498,20499,20500,20501,20502,20503,20504,20505,20506,20507,20508,20509,20721,20723,20725,20727,20729,20731,20733,20735,20737,20739,20741,20743,20745,20747,20749,20751,20817,20819,20821,20823,20825,20827,20829,20831,20833,20835,20837,20839,20841,20843,20845,20847,20913,20915,20917,20919,20921,20923,20925,20927,20929,20931,20933,20935,20937,20939,20941,20943,21194,21196,21198,21200,21202,21204,21206,21208,21210,21212,21214,21216,21218,21220,21222,21224,21226,21228,21230,21232,21234,21236,21238,21240,21242,21244,21246,21248,21250,21252,21254,21320,21322,21324,21326,21328,21330,21332,21334,21336,21338,21340,21342,21344,21346,21348,21350,21352,21354,21356,21358,21360,21362,21364,21366,21368,21370,21372,21374,21376,21378,21380,21382,21450,21740,21867,21888,21889,21890,21894,21896,21898,21902,21904,21906,21910,21912,21914,21918,21922,21924,21926,21928,21931,21935,21937,21939,22107,22108,22109,22110,22111,22112,22113,22114,22115,22116,22117,22118,22119,22120,22121,22122,22123,22124,22125,22126,22127,22128,22129,22130,22131,22133,22134,22135,22136,22137,22534,22535,22559,22570,22571,22778,22961,22963,22965,22967,22969,22971,22973,22975,22977,22979,22981,22983,22985,22987,22989,22991,22993,22995,22997,22999,23001,23003,23005,23007,23009,23011,23013,23015,23017,23019,23021,23023,23025,23027,23029,23031,23033,23035,23037,23039,23041,23043,23045,23047,23049,23051,23053,23071,23073,23075,23077,23079,23081,23083,23085,23089,23091,23093,23095,23097,23099,23101,23103,23105,23107,23109,23111,23113,23115,23117,23119,23525,23533,23559,23561,23563,24395,24592,24593,24594,24595,24596,24597,24632,24636,24637,24638,24639,24640,24641,24642,24696,24698,24702,25266,25545,25546,25547,25548,25718,25887,26888,26890,26892,27070,27071,27072,27073,27074,27075,27076,27077,27078,27079,27080,27081,27082,27083,27084,27085,27086,27087,27088,27089,27090,27091,27092,27093,27094,27095,27096,27097,27098,27099,27100,27101,27102,27103,27104,27105,27106,27107,27108,27109,27110,27111,27112,27113,27114,27115,27116,27117,27118,27119,27120,27121,27122,27123,27124,27125,27126,27127,27128,27129,27130,27131,27142,27143,27147,27148,27149,27150,27151,27167,27169,27170,27171,27174,27175,27176,27177,27178,27179,27180,27181,27182,27184,27185,27186,27187,27188,27190,27191,27192,27193,27194,27195,27196,27197,27198,27224,27225,27226,27227,27229,27230,27231,27232,27233,27234,27235,27236,27237,27238,27239,27240,27243,27244,27245,27246,27247,27249,27250,27251,27252,27253,27254,27255,27256,27257,27258,27259,27260,27313,27315,27319,27321,27325,27327,27331,27333,27337,27339,27343,27345,27349,27351,27353,27357,27359,27361,27367,27371,27373,27377,27379,27381,27383,27387,27391,27393,27395,27401,27403,27405,27409,27411,27413,27417,27419,27423,27427,27429,27433,27435,27439,27441,27445,27447,27451,27453,27924,28324,28326,28328,28332,28334,28336,28375,28377,28511,28514,28516,28518,28520,28522,28524,28526,28528,28530,28532,28534,28536,28538,28540,28542,28544,28545,28547,28549,28550,28552,28554,28556,28557,28559,28561,28563,28565,28671,28673,28675,28677,28679,28681,28683,28685,28729,28731,28733,28735,28737,28739,28740,28742,28744,28746,28748,28750,28752,28754,28756,28758,28770,28772,28774,28776,28778,28780,28782,28784,28786,28788,28790,28791,28792,28793,28794,28795,28796,28797,28798,28799,28800,28801,28802,28803,28804,28805,28806,28807,28808,28809,28810,28811,28812,28813,28814,28815,28816,28817,28818,28819,29336,29337,29338,29339,29340,29341,29344,29345,29616,29618,29620,29622,30013,30028,30486,30488,31864,31866,31868,31870,31872,31874,31876,31878,31880,31882,31884,31886,31888,31890,31892,31894,31896,31898,31900,31902,31904,31906,31908,31910,31916,31918,31922,31924,31926,31928,31930,31932,31936,31942,31944,31946,31948,31950,31952,31954,31955,31956,31957,31958,31959,31962,31963,31964,31965,31966,31967,31968,31969,31970,31971,31972,31973,31974,31975,31976,31977,31978,31979,31982,31990,31998,32006,32014,32101,32102,32103,32104,32105,32107,32108,32109,32110,32111,32112,32113,32114,32115,32116,32117,32118,32119,32120,32121,32122,32123,32124,32125,32305,32306,32307,32308,32309,32310,32311,32312,32436,32438,32440,32442,32809,33151,33152,33153,33154,33155,33156,33157,33158,33330,33332,33334,33403,33404,33405,33406,33446,33447,33448,33459,33460,33468,33469,33470,33471,33472,33473,33618,33619,33620,33816,33817,33818,33819,33820,33821,33822,33832,33842,33844,33850,33959,33960,33961,33962,33963,33964,33988,34260,34264,34485,34487,34489,34718,36908,36909,36910,36911,36912,37450,37452,37453,37454,37455,37456,37603,37613,37805,37815,37820,40457,40461,40521,40723,41036,41038,41043,41044,41045,41046,41047,41048,41049,41050,41051,41052,41053,41061,41062,41197,41201,41212,41214,41215,41217,41218,41220,41489,41490,41603,41611,42136,42137,42138,42145,42146,42200,42201,42202,42203,42204,42205,42206,42207,42208,42209,42210,42211,42212,42213,42214,42215,43775,43915,43916,45535,45999,46002,46005,46658,46659,46660,46661,46662,46663,46664,46665,46666,46667,46668,46669,46671,46672,46673,46674,47232,47867,47868,47869,47870,47871,47872,47966,47967,47968,47969,47971,47973,48081,48082,48095,48097,48098,48099,48102,48103,48104,48107,48108,48109,48121,48469,48470,48471,48472,48473,48474,49714,49715,49716,49742,49743,49775,49776,49777,52307,52308,52309,52348,52349,52350,52351,52352,52353,52392,52393,52394,52395,52396,52397,52398,52399,52400,52401,52402,52403,52404,52405,52406,52407,52684,52685,52686,52687,52688,52689,52791,52792,52793,52794,52795,52796,52972,52974,52975,52976,52977,52978,52997,52998,53029,53030,53031,53032,53033,53034,53129,53130,53131,53132,53133,53134,53135,53136,53137,53138,53140,53141,53142,53143,53144,53244,53288,53289,53290,53303,53304,53722,53723,53724,53725,53726,53727,53728,53729,53730,53731,53732,53733,53908,53909,53910,53911,53912,53913,53914,53915,53916,53917,53918,53919,53988,53989,54410,54411,54412,54413,54414,54415,54416,54417,54418,54419,54420,54421,54422,54423,54424,54425,54426,54427,54827,54828,54829,54842,54843,54844,54845,54846,54848,54849,54851,54852,54853,54854,54856,54857,54858,54859,54861,54862,54863,54864,54865,54866,54867,54868,54869,54870,54871,54872,54873,54874,54970,54971,54972,55025,55763,55830,55831,55832,56209,56210,56211,56212,56225,56226,56264,56266,56708,56709,56710,56711,56712,56713,56714,56715,56716,56832,58785,58786,58787,58788,58791,58792,58793,58794,58809,58810,58811,58812,58813,58814,58815,58816,58817,58818,58819,58820,58825,58826,58827,58828,58973,58974,59210,59211,59212,59213,59214,59215,59216,59217,59218,59219,59220,59222,59224,59225,59234,59235,59236,59237,59238,59239,59240,59241,59242,59243,59244,59245,59246,59247,59421,59422,59423,59424,59425,59426,59427,59428,59429,59430,59431,59432,59678,60314,60315,60381,60514,62855,62856,62857,62858,64390,64391,64392,64393,64394,64907,64908,64909,70798,70799,70836,70837"

/*const fetcher = (url: string) => fetch(url).then(result => result.json())

function App() {
  const { data, error } = useSWR("https://esi.evetech.net/latest/loyalty/stores/1000080/offers/?datasource=tranquility", fetcher)

  const memoedData = React.useMemo(() => data, [])
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age"
          },
          {
            Header: "Visits",
            accessor: "visits"
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Profile Progress",
            accessor: "progress"
          }
        ]
      }
    ],
    []
  );

  return <Table columns={columns} data={memoedData} />;
}*/

/*const getLoyaltyOffer = (url: string) => {
  const fetcher = (url: string) => fetch(url).then((result) => result.json())
  const { data, error } = useSWR(url, fetcher)

  console.log(data)
  const memoizedData = React.useMemo(() => data, []);
  console.log(memoizedData)

  return memoizedData;
}*/

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 500);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 500 results of {rows.length} rows</div>
    </>
  );
}

/*interface invType {
  "basePrice": 80000000,
        "capacity": 0.0,
        "description": "Skill at operating Minmatar freighters.",
        "graphicID": 0,
        "groupID": 257,
        "iconID": 33,
        "marketGroupID": 377,
        "mass": 0.0,
        "portionSize": 1,
        "published": 1,
        "raceID": null,
        "soundID": null,
        "typeID": 20528,
        "typeName": "Minmatar Freighter",
        "volume": 0.01
}*/

interface requiredItems {
  "quantity":number,
  "type_id":number,
  "type_name":string
}

interface offer {
  "isk_cost": number,
  "lp_cost":number,
  "quantity":number,
  "required_items": Array<requiredItems>,
  "type_id":number,
  "type_name":string,
  "market_group":string,
  "corporation_name":string,
  "faction_name":string
}

function requiredItemsSumCost(offer, marketData) {
  let sumCost = 0;
  for (const item of offer.required_items) {
    sumCost = sumCost + marketData[item.type_id].sell.percentile * item.quantity;
  }
  return sumCost;
}

function offerProfit(offer, marketData) {
  return marketData[offer.type_id].buy.percentile * offer.quantity;
}

function offerProfitPerLp(offer, marketData) {
  return Math.round((offerProfit(offer, marketData) - (offer.isk_cost + requiredItemsSumCost(offer, marketData))) / offer.lp_cost);
}

const Styles = styled.div`
padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
  /*
table {
  border-spacing: 0;
  border: 1px solid #ededed;
}
table tr:last-child td {
  border-bottom: 0;
}
table th,
table td {
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid #ededed;
  border-right: 1px solid #ededed;
  position: relative;
}
table th:last-child,
table td:last-child {
  border-right: 0;
}
table tr:nth-child(even) {
  background-color: #fafafa;
}

table th::before {
  position: absolute;
  right: 15px;
  top: 16px;
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}
table th.sort-asc::before {
  border-bottom: 5px solid #22543d;
}
table th.sort-desc::before {
  border-top: 5px solid #22543d;
}*/

function App() {
  // const [loyaltyOffers, setLoyaltyOffers] = useState([{ "ak_cost": 0, "isk_cost": 0, "lp_cost": 0, "offer_id": 0, "quantity": 0, "required_items": [], "type_id": 0 }]);
  // const [nameLoyaltyOffers, setNameLoyaltyOffers] = useState([{ "ak_cost": 0, "isk_cost": 0, "lp_cost": 0, "offer_id": "", "quantity": 0, "required_items": [], "type_id": 0 }]);

  // const [invTypes, setInvTypes] = useState([]);
  // const [typeIdsToTypeNames, setTypeIdsToTypeNames] = useState(new Map());
  const [loyaltyOffers, setLoyaltyOffers] = useState(fileLoyaltyOffers);
  const [marketData, setMarketData] = useState(initialMarketData);
  // const [buyFromSellAndSellToBuyOrderLpPerIskProfit, setBuyFromSellAndSellToBuyOrderLpPerIskProfit] = useState({"0": "0.0"});
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  
  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true)
      const firstResponse = await fetch(firstMarketDataHalf);
      const firstJson = await firstResponse.json();

      const secondResponse = await fetch(secondMarketDataHalf);
      const secondJson = await secondResponse.json();

      setMarketData({...firstJson, ...secondJson});
      setIsLoading(false)
    };
    fetchMarketData();
  }, []);

  useEffect(() => {
    setIsCalculating(true);
    //const profit = {};
    // loyaltyOffers.slice(0, 1).map((offer) => offer["required_items"].map((item) => marketData[item["type_id"]]["sell"]["percentile"] * item["quantity"])  console.log(offer.isk_cost + Number(marketData[offer.type_id].buy.percentile)))
    if ((Object.keys(marketData).length) !== 1) {
      /*console.log("marketData")
      console.log(marketData)
      console.log("offer")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer))
      console.log("required_items")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.required_items))
      console.log("type_id")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.type_id))
      console.log("items")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.required_items.map((item) => item)))
      console.log("item type_id")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.required_items.map((item) => item.type_id)))
      console.log("market data per type_id")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.required_items.map((item) => marketData[item.type_id])))
      console.log("sell per type_id")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.required_items.map((item) => marketData[item.type_id].sell)))
      console.log("percentile per type_id")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.required_items.map((item) => marketData[item.type_id].sell.percentile)))
      console.log("percentile multiplyied by quantity")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.required_items.map((item) => marketData[item.type_id].sell.percentile * item.quantity)))*/

      /*console.log("functionalize")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => requiredItemsSumCost(offer, marketData)))
      console.log("total cost")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offer.isk_cost + requiredItemsSumCost(offer, marketData)))
      console.log("total profit")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => (marketData[offer.type_id].buy.percentile * offer.quantity) - (offer.isk_cost + requiredItemsSumCost(offer, marketData))))
      console.log("profit isk per lp")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => offerProfitPerLp(offer, marketData)))
      console.log("modified offers")
      console.log(loyaltyOffers.slice(0, 1).map((offer) => ({...offer, "isk_per_lp": offerProfitPerLp(offer, marketData)})))*/
      setLoyaltyOffers(loyaltyOffers.map((offer) => ({...offer, "isk_per_lp": offerProfitPerLp(offer, marketData), "buy_market_volume": Math.round(marketData[offer.type_id].buy.volume)})))
    }
    //setBuyFromSellAndSellToBuyOrderLpPerIskProfit(profit);
    setIsCalculating(false);
  }, [marketData]);


  /*useEffect(() => {
    const fetchLoyaltyOffers = async () => {
      const response = await fetch("https://esi.evetech.net/latest/loyalty/stores/1000080/offers/?datasource=tranquility");
      const json = await response.json();
      setLoyaltyOffers(json);
    };
    fetchLoyaltyOffers();
  }, []);*/

  /*useEffect(() => {
    const transformedOffers = [];
    for (const object of loyaltyOffers) {
      const stringNumber = object.type_id.toString()
      transformedOffers.push({ "ak_cost": 0, "isk_cost": 0, "lp_cost": 0, "offer_id": idToName[stringNumber], "quantity": 0, "required_items": [], "type_id": 0 })
      object["type_id"] = 
      }
      setNameLoyaltyOffers();
  }, []);*/
  

  /*useEffect(() => {
    const fetchInvTypes = async () => {
      const response = await fetch("./invTypes.json");
      console.log(response)
      const json = await response.json();
      setInvTypes(json);
    };
    fetchInvTypes();
  }, []);

  useEffect(() => {
    const mapIdToName = new Map();
    for (const invType of invTypes) {
      mapIdToName.set(invType, invType);
    }
    setTypeIdsToTypeNames(mapIdToName);
  }, []);*/



  const columns = React.useMemo(
    () => [
          {
            Header: "Faction Name",
            accessor: "faction_name"
          },
          {
            Header: "Corporation Name",
            accessor: "corporation_name"
          },
          {
            Header: "Item Name",
            accessor: "type_name"
          },
          {
            Header: "Market Group",
            accessor: "market_group"
          },
          {
            Header: "LP Cost",
            accessor: "lp_cost"
          },
          {
            Header: "ISK Cost",
            accessor: "isk_cost"
          },
          {
            Header: "Quantity",
            accessor: "quantity"
          },
          {
            Header: "Buy Volume",
            accessor: "buy_market_volume",
            sortType: 'basic'
          },
          {
            Header: "ISK per LP",
            accessor: "isk_per_lp",
            sortType: 'basic'
          }
      /*,
      {
        Header: "Required Items",
        columns: [
          {
            Header: "Name 1",
            accessor: "required_items[0].type_name"
          },
          {
            Header: "Quantity 1",
            accessor: "required_items[0].quantity"
          },
          {
            Header: "Name 2",
            accessor: "required_items[1].type_name"
          },
          {
            Header: "Quantity 2",
            accessor: "required_items[1].quantity"
          },
          {
            Header: "Name 3",
            accessor: "required_items[2].type_name"
          },
          {
            Header: "Quantity 3",
            accessor: "required_items[2].quantity"
          },
          {
            Header: "Name 4",
            accessor: "required_items[3].type_name"
          },
          {
            Header: "Quantity 4",
            accessor: "required_items[3].quantity"
          },
          {
            Header: "Name 5",
            accessor: "required_items[4].type_name"
          },
          {
            Header: "Quantity 5",
            accessor: "required_items[4].quantity"
          }
        ]
      }*/
    ],
    [marketData]
  );

  const data = React.useMemo(() => loyaltyOffers, [marketData])

  // console.log(loyaltyOffers)
  return (<>
    {(isLoading || isCalculating) ? (
    <div>Loading ...</div>
  ) : (
    <Styles>
    <Table columns={columns} data={data} />
    </Styles>
  )}
  </>);
}

export default App;
