import { describe, expect, test } from "vitest"
import { usePageNation } from "@/shared/composable/usePageNation"

const repeatInformationDummy = (n: number) => Array.from({ length: n }, (_, i) => ({ id: i + 1 }))

describe("次へボタンの制御", () => {
  test("レコード数 > 1ページあたりの表示件数は次に進める", async () => {
    const dummy = repeatInformationDummy(11)
    const {
      page,
      pageController: { next },
    } = usePageNation(() => dummy)

    expect(page.value.from).toBe(1)
    expect(page.value.notHasNext).toBeFalsy()

    next()
    expect(page.value.from).toBe(11)
    expect(page.value.notHasNext).toBeTruthy()
  })

  test("レコード数 = 1ページあたりの表示件数は次に進めない", async () => {
    const dummy = repeatInformationDummy(10)
    const {
      page,
      pageController: { next },
    } = usePageNation(() => dummy)

    expect(page.value.from).toBe(1)
    expect(page.value.notHasNext).toBeTruthy()

    next()
    expect(page.value.from).toBe(1)
    expect(page.value.notHasNext).toBeTruthy()
  })

  test("レコード数 < 1ページあたりの表示件数は次に進めない", async () => {
    const dummy = repeatInformationDummy(9)
    const {
      page,
      pageController: { next },
    } = usePageNation(() => dummy)

    expect(page.value.from).toBe(1)
    expect(page.value.notHasNext).toBeTruthy()

    next()
    expect(page.value.from).toBe(1)
    expect(page.value.notHasNext).toBeTruthy()
  })
})

describe("前へボタンの制御", () => {
  test("レコード数 > 1ページあたりの表示件数は前に進める", async () => {
    const dummy = repeatInformationDummy(11)
    const {
      page,
      pageController: { next, prev },
    } = usePageNation(() => dummy)

    expect(page.value.to).toBe(10)

    next()
    expect(page.value.to).toBe(11)
    expect(page.value.notHasPrev).toBeFalsy()

    prev()
    expect(page.value.to).toBe(10)
    expect(page.value.notHasPrev).toBeTruthy()
  })

  test("レコード数 = 1ページあたりの表示件数は前に進めない", async () => {
    const dummy = repeatInformationDummy(10)
    const {
      page,
      pageController: { next, prev },
    } = usePageNation(() => dummy)

    expect(page.value.to).toBe(10)

    next()
    expect(page.value.to).toBe(10)
    expect(page.value.notHasPrev).toBeTruthy()

    prev()
    expect(page.value.to).toBe(10)
    expect(page.value.notHasPrev).toBeTruthy()
  })

  test("レコード数 < 1ページあたりの表示件数は次に進めない", async () => {
    const dummy = repeatInformationDummy(9)
    const {
      page,
      pageController: { next, prev },
    } = usePageNation(() => dummy)

    expect(page.value.to).toBe(9)

    next()
    expect(page.value.to).toBe(9)
    expect(page.value.notHasPrev).toBeTruthy()

    prev()
    expect(page.value.to).toBe(9)
    expect(page.value.notHasPrev).toBeTruthy()
  })
})

describe("件数の表示", () => {
  test("検索結果が1件もない場合は0-0/0件", async () => {
    const { page } = usePageNation(() => [])

    expect(page.value.from).toBe(0)
    expect(page.value.to).toBe(0)
    expect(page.value.total).toBe(0)
  })

  test(`検索結果が9件の場合は1-9/9件`, async () => {
    const { page } = usePageNation(() => repeatInformationDummy(9))

    expect(page.value.from).toBe(1)
    expect(page.value.to).toBe(9)
    expect(page.value.total).toBe(9)
  })

  test("検索結果が10件の場合は1-10/10件", async () => {
    const { page } = usePageNation(() => repeatInformationDummy(10))

    expect(page.value.from).toBe(1)
    expect(page.value.to).toBe(10)
    expect(page.value.total).toBe(10)
  })

  test("検索結果が11件の場合は1ページ目は1-10/11件", async () => {
    const { page } = usePageNation(() => repeatInformationDummy(11))

    expect(page.value.from).toBe(1)
    expect(page.value.to).toBe(10)
    expect(page.value.total).toBe(11)
  })

  test("検索結果が11件の場合は2ページ目は11-11/11件", async () => {
    const {
      page,
      pageController: { next },
    } = usePageNation(() => repeatInformationDummy(11))

    expect(page.value.from).toBe(1)
    expect(page.value.to).toBe(10)
    expect(page.value.total).toBe(11)

    next()
    expect(page.value.from).toBe(11)
    expect(page.value.to).toBe(11)
    expect(page.value.total).toBe(11)
  })

  test("検索結果が21件の場合は2ページ目は11-20/21件", async () => {
    const {
      page,
      pageController: { next },
    } = usePageNation(() => repeatInformationDummy(21))

    expect(page.value.from).toBe(1)
    expect(page.value.to).toBe(10)
    expect(page.value.total).toBe(21)

    next()
    expect(page.value.from).toBe(11)
    expect(page.value.to).toBe(20)
    expect(page.value.total).toBe(21)
  })
})
