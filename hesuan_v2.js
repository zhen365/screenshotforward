sleep(2000);
unLock("000000");
zhbOpenHesuan();
getScreen();
sendScreen("文件传输助手");


// 唤醒设备+单指上滑+密码解锁
function unLock(passwd) {
    device.wakeUp();
    sleep(1000);
    gestures([200,[100, 2000], [100, 100]]);
    sleep(1000);
    for (var i=0; i<passwd.length; i++) {
        click(passwd[i]);
    }
    toastLog("解锁成功");
    sleep(1000);
}

// 进入郑好办核酸结果界面
function zhbOpenHesuan() {
    launchApp("郑好办");
    text("郑好码").waitFor();
    toastLog("进入郑好办");
    click("郑好码")
    text("核酸检测结果").waitFor();
    click("核酸检测结果")
    text("个人信息").waitFor();
    toastLog("进入核酸界面");   
}

function getScreen() {
    var thread = threads.start(function () {
        var beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000);
        if (beginBtn) {
            sleep(500)
            beginBtn.click();
        }
    });
    requestScreenCapture();
    sleep(2000);
    captureScreen("/sdcard/DCIM/hesuan.jpg");
    toastLog("截图完成");
    thread.interrupt();
}

function sendScreen(userName) {
    launchApp("微信");
    text(userName).waitFor();
    click(userName);
    className("android.widget.EditText").findOne(1000).setText("/sdcard/DCIM/hesuan.jpg");
    click("确定");
    toastLog("发送成功");
}