<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdditionalFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
            $table->string('whatsapp')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('gender')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('city')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('referral_code')->nullable();
            $table->string('a1')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
            $table->dropColumn('whatsapp');
            $table->dropColumn('birthdate');
            $table->dropColumn('gender');
            $table->dropColumn('neighborhood');
            $table->dropColumn('city');
            $table->dropColumn('user_id');
            $table->dropColumn('referral_code');
            $table->dropColumn('a1');
        });
    }
};
