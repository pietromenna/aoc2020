package day02

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
	"testing"
)

func Test_PartOne(t *testing.T) {
	myInput, e := ioutil.ReadFile("input.txt")
	if e != nil {
		panic(e)
	}
	lines := strings.Split(string(myInput), "\n")
	expectedCount := 628
	actualCount := 0
	for _, l := range lines {
		if ParsePassword(l) {
			actualCount += 1
		}
	}

	if expectedCount != actualCount {
		t.Errorf("expected %d got %d", expectedCount, actualCount)
	}
}

func Test_PartOneSample(t *testing.T) {
	var sampleTestCases = []struct{
		in string
		out bool
	}{
		{"1-3 a: abcde", true},
		{"1-3 b: cdefg", false},
		{"2-9 c: ccccccccc", true},
	}

	expectedCount := 2
	actualCount := 0
	for _, tc := range sampleTestCases {
		if got := ParsePassword(tc.in); got {
			if got != tc.out {
				fmt.Println(tc.in + " is incorrect")
			}
			actualCount += 1
		}
	}

	if expectedCount != actualCount {
		t.Errorf("expected %d, got %d", expectedCount, actualCount)
	}
}

func ParsePassword(in string) bool {
	parts := strings.Split(in, " ")
	indexes := strings.Split(parts[0], "-")
	idx1,err := strconv.Atoi(indexes[0])
	if err != nil {
		panic(err)
	}
	idx2,err := strconv.Atoi(indexes[1])
	if err != nil {
		panic(err)
	}
	//Looks like a good case for regex, but it won't be fun
	letter := int32(parts[1][0])

	count := 0
	for _, c := range parts[2] {
		if c == letter {
			count += 1
		}
	}
	return count >= idx1 && count <= idx2
}
