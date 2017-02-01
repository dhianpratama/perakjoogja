<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->string('id', 32)->primary();
            $table->string('title');
            $table->string('caption')->nullable();
            $table->string('description', 4096)->nullable();
            $table->string('event_type_id', 32)->index();
            $table->boolean('is_continuous')->default(false);
            $table->dateTime('start_date');
            $table->dateTime('end_date')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time')->nullable();
            $table->string('organizer_id', 32)->nullable()->index();
            $table->string('event_venue');
            $table->string('event_address');
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('contact_person_name')->nullable();
            $table->string('contact_person_number')->nullable();
            $table->integer('price')->nullable();
            $table->boolean('is_published')->default(false);
            $table->string('created_by');
            $table->string('updated_by');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('event_type_id')->references('id')->on('event_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('events');
    }
}
