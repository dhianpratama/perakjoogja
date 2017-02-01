<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScholarshipTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scholarships', function (Blueprint $table) {
            $table->string('id', 32)->primary();
            $table->string('title');
            $table->string('organizer', 1024)->nullable();
            $table->string('organizer_description', 2048)->nullable();
            $table->string('description', 4096)->nullable();
            $table->dateTime('deadline')->nullable();
            $table->smallInteger('city_id')->nullable()->unsigned()->index();
            $table->boolean('is_published')->default(false);
            $table->string('created_by');
            $table->string('updated_by');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('city_id')->references('city_id')->on('cities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
