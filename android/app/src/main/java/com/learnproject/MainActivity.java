package com.learnproject;

import android.content.Intent;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {

    //构建一个阻塞的单一数据的队列
    public static ArrayBlockingQueue<String> mQueue = new ArrayBlockingQueue<String>(1);

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "learnProject";
    }



    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


    }
}
