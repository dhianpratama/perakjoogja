<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePivotEventCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events_categories', function (Blueprint $table) {
            $table->increments('id');

            $table->string('event_id', 32)->index();
            $table->string('category_id', 32)->index();

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('events');
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('events_categories');
    }
}
