package com.learnproject;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

/**
 * Created by shuyu on 2017/2/20.
 * 新的activity用于承载新的react页面
 */
public class DetailActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     *
     * 这里指定了js的默认加载类名字，然后你需要在js中register它
     */
    @Override
    protected String getMainComponentName() {
        return "detail";
    }



}