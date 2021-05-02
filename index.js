const main = async () => {
    const axios = require('axios');
    const cheerio = require('cheerio')
    const TokenAddress = "0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95"
    const config = {
        method: 'get',
        url: `https://www.bscscan.com/txs?a=${TokenAddress}`,
    };
    let mangalink;
    const RawData = await axios(config).then(function (response) {
        let $ = cheerio.load(response.data)
        let Txn_Hash,Block,DateTime,Time,From,Status,To,Value,Txn_Fee;
        $('tbody > tr > td').each((index, element) => {
            if (index < 10) {
                switch (index < 10) {
                    case 1:
                        Txn_Hash = $(element).text()
                        break;
                    case 2:
                        Block =  $(element).text()
                        break;
                    case 3:
                        DateTime =  $(element).text()
                        break;
                    case 4:
                        Time =  $(element).text()
                        break;
                    case 5:
                        From = $(element).text()
                        break;
                    case 6:
                        Status = $(element).text()
                        break;
                    case 7:
                        To =  $(element).text()
                        break;
                    case 8:
                        Value =  $(element).text()
                        break;
                    case 9:
                        Txn_Fee =  $(element).text()
                        break;
                    default:
                        break;
                }
            }
        })
        mangalink = {Txn_Hash,Block,DateTime,Time,From,Status,To,Value,Txn_Fee}        
        return mangalink
    })
    if(RawData.Time.indexOf('secs')>=0){
        console.log(RawData)
        console.log('แจ้งเตือนได้')
    }else{
        console.log('ไม่ต้องแจ้งเตือน')
    }
}
setInterval(()=>{
    main();       
},30000);

//เอาไปพัฒนาต่อเอาเองนะ ขี้เกียจละ 5555555