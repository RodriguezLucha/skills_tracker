#!/usr/bin/env perl
use strict;
use warnings;

my $cmd =
  'curl -d year=2020 -d name=Running http://localhost:3000/calender | jq';
print $cmd;
system $cmd;
