sleep(2000);
unLock("000000");
zhbOpenHesuan();
getScreen();
sendScreen();

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

// 三指下滑截图
function getScreen() {
    gestures([350, [300, 400], [300, 1400]],
        [350, [600, 400], [600, 1400]],
        [350, [900, 400], [900, 1400]]);
    toastLog("截图成功");
    sleep(4000);
}

// 进入郑好办核酸结果界面
function zhbOpenHesuan() {
    if (launchApp("郑好办")) {
        toastLog("打开郑好办");
        sleep(7000);
        if (click("郑好码")) {
            sleep(5000);
            // 2.2 进入核酸检测结果
            if (click(400, 2500)) {
                toastLog("进入核酸检测结果");
                sleep("2000");
            } else {
                toastLog("找不到核酸检测结果")
                exit();
            }
        } else {
            toastLog("找不到郑好码");
            exit();
        }
    } else {
        toastLog("无法打开郑好办");
        exit();
    }
}

// MIUI发送截图
function sendScreen() {
    click(1200, 1200);
    toastLog("进入分享界面");
    sleep(2000);
    click(230, 2900);
    toastLog("进入微信");
    sleep(2000);
    click(200, 1400);
    toastLog("选中用户");
    sleep(2000);
    click(1000, 2300);
    toastLog("发送成功");
    sleep(2000);
}