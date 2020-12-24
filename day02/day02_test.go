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
		if ParsePasswordPart1(l) {
			actualCount += 1
		}
	}

	if expectedCount != actualCount {
		t.Errorf("expected %d got %d", expectedCount, actualCount)
	}
}

func Test_PartTwo(t *testing.T) {
	myInput, e := ioutil.ReadFile("input.txt")
	if e != nil {
		panic(e)
	}
	lines := strings.Split(string(myInput), "\n")
	expectedCount := 705
	actualCount := 0
	for _, l := range lines {
		if ParsePasswordPart2(l) {
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
		if got := ParsePasswordPart1(tc.in); got {
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

func ParsePasswordPart1(in string) bool {
	parts, idx1, idx2, letter := extractTokens(in)

	count := 0
	for _, c := range parts[2] {
		if c == letter {
			count += 1
		}
	}
	return count >= idx1 && count <= idx2
}

func ParsePasswordPart2(in string) bool {
	parts, idx1, idx2, letter := extractTokens(in)

	count := 0
	if int32(parts[2][idx1-1]) == letter {
		count += 1
	}
	if int32(parts[2][idx2-1]) == letter {
		count += 1
	}
	return count == 1
}

func extractTokens(in string) ([]string, int, int, int32) {
	parts := strings.Split(in, " ")
	indexes := strings.Split(parts[0], "-")
	idx1, err := strconv.Atoi(indexes[0])
	if err != nil {
		panic(err)
	}
	idx2, err := strconv.Atoi(indexes[1])
	if err != nil {
		panic(err)
	}
	letter := int32(parts[1][0])
	return parts, idx1, idx2, letter
}

func Test_PartTwoSample(t *testing.T) {
	var sampleTestCases = []struct{
		in string
		out bool
	}{
		{"1-3 a: abcde", true},
		{"1-3 b: cdefg", false},
		{"2-9 c: ccccccccc", false},
	}

	expectedCount := 1
	actualCount := 0
	for _, tc := range sampleTestCases {
		if got := ParsePasswordPart2(tc.in); got {
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