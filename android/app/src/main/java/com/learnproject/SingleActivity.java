package com.learnproject;

import android.app.Activity;
import android.os.Bundle;
import android.os.Environment;
import android.widget.Toast;

import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.NativeModuleCallExceptionHandler;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.learnproject.rnpackage.DetailPackage;

import java.io.File;

/**
 * Created by guoshuyu on 2017/2/22.
 */

public class SingleActivity extends Activity {

    ReactRootView mReactRootView;

    ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_single_layout);

        mReactRootView = (ReactRootView) findViewById(R.id.single_react_root_view);

        //todo 记得把项目根目录下的 android.bundle 放到手机的根目录下。
        String path = Environment.getExternalStorageDirectory().getPath() + "/android.bundle";

        if (new File(path).exists()) {
            mReactInstanceManager = ReactInstanceManager.builder()
                    .setApplication(this.getApplication())
                    .setJSBundleFile(path)//设置加载文件
                    .setNativeModuleCallExceptionHandler(new NativeModuleCallExceptionHandler() {
                        @Override
                        public void handleException(Exception e) {
                        }
                    })
                    .addPackage(new DetailPackage())
                    .addPackage(new MainReactPackage())
                    .addPackage(new LottiePackage())
                    .setJSMainModuleName("detail")
                    .setUseDeveloperSupport(false)
                    .setInitialLifecycleState(LifecycleState.RESUMED)
                    .build();
            mReactRootView.startReactApplication(mReactInstanceManager, "detail", null);//启动入口
        } else {
            Toast.makeText(this, "请把项目根目录下的 android.bundle 放到手机的根目录下。", Toast.LENGTH_LONG).show();
        }

    }
}
