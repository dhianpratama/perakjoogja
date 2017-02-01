<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCityProvince extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->tinyInteger('province_id', 1, 1);
            $table->string('province_name', 50);
            $table->string('province_name_abbr', 50);
            $table->string('province_name_id', 50);
            $table->string('province_name_en', 50);
            $table->smallInteger('province_capital_city_id')->unsigned()->index();
            $table->string('iso_code', 5)->index();
            $table->string('iso_name', 50);
            $table->enum('iso_type',
            [
                'province',
                'autonomous province',
                'special district',
                'special region',
            ]);
            $table->string('iso_geounit', 2)->index();
            $table->tinyInteger('timezone');
            $table->float('province_lat', 10, 6)->nullable()->index();
            $table->float('province_lon', 10, 6)->nullable()->index();            
        });

        Schema::create('cities', function (Blueprint $table) {
            $table->smallInteger('city_id', 1, 1);
            $table->tinyInteger('province_id')->unsigned()->index();
            $table->string('city_name', 50)->index();
            $table->string('city_name_full', 100)->index();
            $table->enum('city_type', ['kabupaten', 'kota'])->nullable();
            $table->float('city_lat', 10, 6)->nullable()->index();
            $table->float('city_lon', 10, 6)->nullable()->index();

            $table->foreign('province_id')->references('province_id')->on('provinces');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('cities');
        Schema::drop('provinces');
    }
}
