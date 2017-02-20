package com.learnproject;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;

/**
 * Created by shuyu on 2017/2/20.
 * 新的activity用于承载新的react页面
 */
public class DetailActivity extends ReactActivity {

    private static int i = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        i++;
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     * <p>
     * 这里指定了js的默认加载类名字，然后你需要在js中register它
     */
    @Override
    protected String getMainComponentName() {
        return "detail";
    }

    @Override
    public void onBackPressed() {
        Intent intent = new Intent();
        intent.putExtra("result", "我是传说中的返回数据 " + i--);
        setResult(Activity.RESULT_OK, intent);

        super.onBackPressed();
    }
}