<?php

use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class EventTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('event_types')->delete();

        DB::table('event_types')->insert([
            [
                'id' => Uuid::uuid4()->getHex(),
                'name' => 'Seminar',
                'description' => 'Seminar',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ],
            [
                'id' => Uuid::uuid4()->getHex(),
                'name' => 'Debat',
                'description' => 'Debat',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ]
        ]);
    }
}