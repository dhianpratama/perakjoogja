<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVacancy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vacancy_types', function (Blueprint $table) {
            $table->string('id', 32)->primary();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('created_by');
            $table->string('updated_by');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('vacancies', function (Blueprint $table) {
            $table->string('id', 32)->primary();
            $table->string('title');
            $table->string('caption')->nullable();
            $table->string('description', 2048)->nullable();
            $table->string('organizer_id', 32)->index();
            $table->string('vacancy_type_id', 32)->index();
            $table->dateTime('due_date')->nullable();
            $table->boolean('is_published')->default(false);
            $table->string('created_by');
            $table->string('updated_by');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('vacancy_type_id')->references('id')->on('vacancy_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('vacancies');
        Schema::drop('vacancy_types');
    }
}
