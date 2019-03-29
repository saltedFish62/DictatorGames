const WAITTIME_60 = 60000;
const WAITTIME_20 = 20000;
const WAITTIME_ran = Math.round(Math.random() * 5000);
const duriation = 400;

var res = {
    phone: '',
    number: '',
    prices_my: [],
    prices_p: [],
    time: []
};

var inp1 = false, inp2 = false;
var prices = [100,120,100,120];
var ind = 0, time = 1;

// Math.round(Math.random() * 5000)
$(document).ready(function() {
    $("#home").fadeIn("slow");

    $("#num").change((e)=> {
        inp1 = true;
        showBtn("#home_btn");
    })
    $("#phone").change((e)=> {
        inp2 = true;
        showBtn("#home_btn");
    })

    $("#home_btn").click(gotoGameDes1);
    $("#des_btn_1").click(gotoGameDes2);
    $("#des_btn_2").click(gotoWait_1);
    $("#alloc_btn").click(gotoWait_2);
})

function gotoGameDes1() {
    if (!checkUser()) {
        return;
    }
    $("#alertBar").hide();
    $("#home").fadeOut(duriation);
    setTimeout(function() {
        $("#gameDes_1").fadeIn(duriation);
    }, duriation);
    setTimeout(function() {
        $("#des_btn_1").fadeIn(duriation);
    }, WAITTIME_60);
}

function checkUser() {
    var phone = document.getElementById('phone').value;
        if(!(/^1[34578]\d{9}$/.test(phone))){
            $("#alertBar").html('请输入正确电话号码').show();
            return false;
        }
    res.number = $("#num").val();
    res.phone = phone;
    return true;
}

function gotoGameDes2() {
    $("#gameDes_1").fadeOut(duriation);
    setTimeout(function() {
        $("#gameDes_2").fadeIn(duriation);
    }, duriation);
    setTimeout(function() {
        $("#des_btn_2").fadeIn(duriation);
    }, WAITTIME_20);
}

function gotoWait_1() {
    $("#gameDes_2").fadeOut(duriation);
    $("#waiting_1").fadeIn(duriation);
    $("#p_num").html(Math.round(Math.random() * 10) + 1);
    setTimeout(function() {
        $("#waiting_1").fadeOut(duriation);
        gotoAlloc(prices[ind]);
    }, WAITTIME_ran);
}

function gotoAlloc(price) {
    console.log(ind)
    ind++;
    $("#price").html(price);

    $("#alloc").fadeIn(duriation);
    updateTime()
    $("#alloc_money_my_1").change((e)=> {
        inp1 = true;
        showBtn("#alloc_btn");
    })
    $("#alloc_money_p_1").change((e)=> {
        inp2 = true;
        showBtn("#alloc_btn");
    })
}

function showBtn(id) {
    if (inp1 && inp2) {
        $(id).fadeIn(duriation);
        inp1 = !inp1;
        inp2 = !inp2;
    }
}

function gotoWait_2() {
    if(!checkInput()) {
        return ;
    }
    if(ind === 4) {
        gotoThanks();
        return ;
    }

    $("#alertBar").hide();
    $("#alloc").fadeOut(duriation);
    $("#waiting_2").fadeIn(duriation);
    setTimeout(() => {
      $("#waiting_2").fadeOut(duriation);
      gotoAlloc(prices[ind]);
    }, WAITTIME_ran + 3000);
}

function checkInput() {
    var i1 = document.getElementById("alloc_money_my_1"), i2 = document.getElementById("alloc_money_p_1");
    if(Number(i1.value) < 0 || Number(i1.value) > prices[ind-1] || Number(i2.value) < 0 || Number(i2.value) > prices[ind-1]) {
        $("#alertBar").html('请输入正确金额').show();
        return false;
    }
    var t = time;
    updateTime();
    res.prices_my.push(i1.value);
    res.prices_p.push(i2.value);
    res.time.push(time-t);
    i1.value = '';
    i2.value = '';
    return true;
}

function updateTime() {
    var tmp = Date.parse( new Date() ).toString();
    tmp = tmp.substr(0,10);
    time = tmp;
  }

function gotoThanks() {
    uploadData();
    $("#alloc").fadeOut(duriation);
    $("#final_page").fadeIn(duriation);
    setTimeout(() => {
        $("#final_hint").html("感谢您的参与，请继续填写问卷");
    }, WAITTIME_ran + 3000);
}

function uploadData() {

}