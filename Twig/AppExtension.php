<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;

use Twig\TwigFilter;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function __construct()
    {
        // this simple example doesn't define any dependency, but in your own
        // extensions, you'll need to inject services using this constructor
    }

    public function getFilters()
    {
        return [
            new TwigFilter('myFilter', [AppRuntime::class, 'myFilter']),
        ];
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('myFunction', [AppRuntime::class, 'myFunction']),
        ];
    }
}


