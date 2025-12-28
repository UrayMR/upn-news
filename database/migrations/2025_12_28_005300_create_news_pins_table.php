<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news_pins', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('news_id')->constrained('news')->onDelete('cascade');
            $table->string('position')->default('headline'); // 'headline', '1st_section', '2nd_section'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_pins');
    }
};
