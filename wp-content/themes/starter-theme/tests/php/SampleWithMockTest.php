<?php
use PHPUnit\Framework\TestCase;
use stdClass;

final class SampleWithWPMockTest extends TestCase {
	public function testMyFunction() : void
    {
        WP_Mock::userFunction('is_single', [
            'return_in_order' => [true, false],
        ]);

        $this->assertTrue(is_single());
        $this->assertFalse(is_single());
    }
}