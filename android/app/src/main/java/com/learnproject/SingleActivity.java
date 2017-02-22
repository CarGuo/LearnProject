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
import com.learnproject.utils.Contants;
import com.xiasuhuei321.loadingdialog.view.LoadingDialog;

import java.io.File;

import cn.finalteam.okhttpfinal.FileDownloadCallback;
import cn.finalteam.okhttpfinal.HttpRequest;

/**
 * Created by guoshuyu on 2017/2/22.
 */

public class SingleActivity extends Activity {

    ReactRootView mReactRootView;

    ReactInstanceManager mReactInstanceManager;

    LoadingDialog mLoadingDialog;

    //todo 记得把项目根目录下的 android.bundle 放到手机的根目录下。
    String path = Environment.getExternalStorageDirectory().getPath() + "/android.bundle";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_single_layout);

        mReactRootView = (ReactRootView) findViewById(R.id.single_react_root_view);

        if (new File(path).exists()) {
            setReactNative();
        } else {

            mLoadingDialog = new LoadingDialog(this);
            mLoadingDialog.setLoadingText("加载中...");
            mLoadingDialog.show();

            downLoadBundle(Contants.URL, path);
        }
    }


    private void downLoadBundle(String url, String path) {

        File saveFile = new File(path);
        HttpRequest.download(url, saveFile, new FileDownloadCallback() {
            //开始下载
            @Override
            public void onStart() {
                super.onStart();
            }

            //下载进度
            @Override
            public void onProgress(int progress, long networkSpeed) {
                super.onProgress(progress, networkSpeed);
            }

            //下载失败
            @Override
            public void onFailure() {
                super.onFailure();
                Toast.makeText(getBaseContext(), "下载失败", Toast.LENGTH_SHORT).show();
                mLoadingDialog.loadFailed();
            }

            //下载完成（下载成功）
            @Override
            public void onDone() {
                super.onDone();
                Toast.makeText(getBaseContext(), "下载成功", Toast.LENGTH_SHORT).show();
                mLoadingDialog.loadSuccess();
                setReactNative();
            }
        });
    }



    private void setReactNative() {
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
