package com.learnproject;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.lottie.LottiePackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

import com.learnproject.rnpackage.DetailPackage;
import com.xiasuhuei321.loadingdialog.manager.StyleManager;
import com.xiasuhuei321.loadingdialog.view.LoadingDialog;

import cn.finalteam.okhttpfinal.OkHttpFinal;
import cn.finalteam.okhttpfinal.OkHttpFinalConfiguration;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LottiePackage(),
            new RNSpinkitPackage(),
            new PhotoViewPackage(),
            new VectorIconsPackage(),
            new DetailPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    OkHttpFinalConfiguration.Builder builder = new OkHttpFinalConfiguration.Builder();
    OkHttpFinal.getInstance().init(builder.build());

    StyleManager styleManager = new StyleManager();
    styleManager.Anim(false).repeatTime(0).contentSize(-1).intercept(true);
    LoadingDialog.initStyle(styleManager);

  }
}
