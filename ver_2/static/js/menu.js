
var channel;
var gnbArr,
    subMenu;

//Channel
channel = $('html').data('channel');

//My Money GNB
var gnbMM = [
    {
        "number" : "0",
        "name": "My NOW",
        "link": "#mynowlink",
        "sub": ""
    },
    {
        "number" : "1",
        "name": "자산",
        "link": "#",
        "sub": "asset"
    },
    {
        "number" : "2",
        "name": "지출",
        "link": "#assetlink",
        "sub": "expense"
    },
    {
        "number" : "3",
        "name": "목표 챌린지",
        "link": "#link",
        "sub": ""
    },
    {
        "number" : "4",
        "name": "부동산",
        "link": "#link",
        "sub": "realstate"
    },
    {
        "number" : "5",
        "name": "자동차",
        "link": "#link",
        "sub": "car"
    },
    {
        "number" : "6",
        "name": "My 금고",
        "link": "#link",
        "sub": ""
    },
    {
        "number" : "7",
        "name": "신용",
        "link": "#link",
        "sub": ""
    },
    {
        "number" : "10",
        "name": "머니크루",
        "link": "#link",
        "sub": "mydataGift"
    },
    // {
    //     "number" : "11",
    //     "name": "마이데이터 관리",
    //     "link": "#link",
    //     "sub": "mydataManage"
    // },
    // {
    //     "number" : "8",
    //     "name": "슬그Money",
    //     "link": "#link",
    //     "sub": ""
    // },
    {
        "number" : "9",
        "name": "D플랜",
        "link": "#link",
        "sub": "dplan"
    }
];

//StarBanking GNB
var gnbStar = [
    {
        "number" : "0",
        "name": "자산",
        "link": "#",
        "sub": ""
    },
    {
        "number" : "1",
        "name": "투자",
        "link": "#",
        "sub": ""
    },
    {
        "number" : "2",
        "name": "지출",
        "link": "#",
        "sub": ""
    },
    {
        "number" : "3",
        "name": "세테크",
        "link": "#link",
        "sub": ""
    },
    {
        "number" : "4",
        "name": "연금(은퇴)",
        "link": "#link",
        "sub": ""
    },
    {
        "number" : "5",
        "name": "금융플러스",
        "link": "#link",
        "sub": ""
    },
    {
        "number" : "6",
        "name": "Fun테크",
        "link": "#link",
        "sub": ""
    },
    {
        "number" : "7",
        "name": "전문가 상담",
        "link": "#link",
        "sub": ""
    }
];



//채널별 메뉴 구성 조정
if(channel == 'ch_star'){//STARBANKING
    gnbArr = gnbStar;
    
}else if(channel == 'ch_liiv'){        
    
}else{  // 마이머니
    gnbArr = gnbMM;
}

