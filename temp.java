package com.belia.myintentapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements onclick, View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnMoveActivity = findViewById(R.id.btn_move_activity);
        btnMoveActivity.setOnClickListener(this);

        Button btnMoveWithDataActivity = findViewById(R.id.btn_move_activity_data);
        btnMoveWithDataActivity.setOnClickListener(this);

        Button btnMoveWithObject = findViewById(R.id.btn_move_activity_object);
        btnMoveWithObject.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn_move_activity) {
            Intent moveIntent = new Intent(MainActivity.this, MoveActivity.class);
            startActivity(moveIntent);
        } else if (v.getId() == R.id.btn_move_activity_data) {
            Intent moveWithDataIntent = new Intent(MainActivity.this, MoveWithdataActivity.class);
            moveWithDataIntent.putExtra(MoveWithdataActivity.EXTRA_NAME, "DicodingAcademy Boy");
            moveWithDataIntent.putExtra(MoveWithdataActivity.EXTRA_AGE, 5);
            startActivity(moveWithDataIntent);

        } else if (v.getId() == R.id.btn_move_activity_object) {
            Person person = new Person();
            person.setName("Jurusan SI");
            person.setAge(5);
            person.setEmail("academy@ilkom.unsri.ac.id");
            person.setCity("Palembang");

            Intent moveWithObjectIntent = new Intent(MainActivity.this,MoveWithObjectActivity.class);
            moveWithObjectIntent.putExtra(MoveWithObjectActivity.EXTRA_PERSON,person);

            startActivity(moveWithObjectIntent);
        }
    }
}