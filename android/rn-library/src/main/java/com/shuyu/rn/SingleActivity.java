package com.shuyu.rn;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;

import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.NativeModuleCallExceptionHandler;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.reactnative.photoview.PhotoViewPackage;


public class SingleActivity extends Activity implements DefaultHardwareBackBtnHandler {

    ReactRootView mReactRootView;

    ReactInstanceManager mReactInstanceManager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_single_layout);

        mReactRootView = (ReactRootView) findViewById(R.id.single_react_root_view);

        setReactNative();
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
    }


    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }


    private void setReactNative() {

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(this.getApplication())
                .setBundleAssetName("index.android.bundle")//设置加载文件
                .setNativeModuleCallExceptionHandler(new NativeModuleCallExceptionHandler() {
                    @Override
                    public void handleException(Exception e) {
                        e.printStackTrace();
                    }
                })
                .addPackage(new MainReactPackage())
                .addPackage(new LottiePackage())
                .addPackage(new PhotoViewPackage())
                .setJSMainModuleName("learnProject")//
                .setUseDeveloperSupport(false)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        mReactRootView.startReactApplication(mReactInstanceManager, "learnProject", null);//启动入口
    }


}
