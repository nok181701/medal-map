import React from "react";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

const TermsOfService = () => {
  return (
    <>
      <Header />
      <div className="bg-contentsBg p-8 dark:bg-gray-600 transition-colors duration-300 ease-in-out">
        <h1 className="text-3xl font-bold  pb-2 mb-8 border-b border-black">
          利用規約
        </h1>

        <article className="text-lg">
          <p className="text-sm mb-3">
            この利用規約（以下、「本規約」といいます。）は、メダルマップが（以下、「当方」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
          </p>
          <h2 className="text-xl font-bold mb-2">第１条（適用）</h2>
          <p className="text-sm mb-2">
            本規約は、ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
            当方は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め
            （以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、
            本規約の一部を構成するものとします。
            本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において
            特段の定めなき限り、個別規定の規定が優先されるものとします。
          </p>
          <h2 className="text-xl font-bold mb-2">第２条（利用登録）</h2>
          <p className="text-sm mb-2">
            本サービスにおいては、登録希望者が本規約に同意の上、当方の定める方法によって利用登録を申請し、
            当方がこの承認を登録希望者に通知することによって、利用登録が完了するものとします。
            当方は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、
            その理由については一切の開示義務を負わないものとします。
          </p>
          <ol className="list-decimal ml-6 mb-4">
            <li className="text-sm">
              利用登録の申請に際して虚偽の事項を届け出た場合
            </li>
            <li className="text-sm">
              本規約に違反したことがある者からの申請である場合
            </li>
            <li className="text-sm">
              その他、当方が利用登録を相当でないと判断した場合
            </li>
          </ol>
          <h2 className="text-xl font-bold mb-2">第３条（禁止事項）</h2>
          <p className="text-sm">
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
          </p>
          <ol className="list-decimal ml-6 mb-4">
            <li className="text-sm">法令または公序良俗に違反する行為</li>
            <li className="text-sm">犯罪行為に関連する行為</li>
            <li className="text-sm">
              当方、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
            </li>
          </ol>
          <h2 className="text-xl font-bold mb-2">
            第４条（本サービスの提供の停止等）
          </h2>
          <p className="text-sm">
            当方は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
          </p>
          <ol className="list-decimal ml-6 mb-4">
            <li className="text-sm">
              本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
            </li>
            <li className="text-sm">
              地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
            </li>
            <li className="text-sm">
              コンピュータまたは通信回線等が事故により停止した場合
            </li>
          </ol>
          <p className="text-sm mb-2">
            当方は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
          </p>
          <h2 className="text-xl font-bold mb-2">
            第５条（保証の否認および免責事項）
          </h2>
          <p className="text-sm">
            当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </p>
          <p className="text-sm">
            当方は、本サービスに起因してユーザーに生じたあらゆる損害について、当方の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する当方とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
          </p>
          <p className="text-sm">
            前項ただし書に定める場合であっても、当方は、当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当方またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
          </p>
          <p className="text-sm mb-2">
            当方は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
          </p>
          <h2 className="text-xl font-bold mb-2">
            第６条（サービス内容の変更等）
          </h2>
          <p className="text-sm mb-2">
            当方は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
          </p>
          <h2 className="text-xl font-bold mb-2">第７条（利用規約の変更）</h2>
          <p className="text-sm">
            当方は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
          </p>
          <ol className="list-decimal ml-6 mb-4">
            <li className="text-sm">
              本規約の変更がユーザーの一般の利益に適合するとき。
            </li>
            <li className="text-sm">
              本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
            </li>
          </ol>
          <p className="text-sm mb-2">
            当方はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
          </p>
          <h2 className="text-xl font-bold mb-2">第８条（個人情報の取扱い）</h2>
          <p className="text-sm mb-2">
            当方は、本サービスの利用によって取得する個人情報については、当方「プライバシーポリシー」に従い適切に取り扱うものとします。
          </p>
          <h2 className="text-xl font-bold mb-2">第９条（通知または連絡）</h2>
          <p className="text-sm mb-2">
            ユーザーと当方との間の通知または連絡は、当方の定める方法によって行うものとします。当方は、ユーザーから、当方が別途定める方式に従った変更届け出がない限り、
            現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
          </p>
          <h2 className="text-xl font-bold mb-2">
            第１０条（権利義務の譲渡の禁止）
          </h2>
          <p className="text-sm mb-2">
            ユーザーは、当方の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
          </p>
          <h2 className="text-xl font-bold mb-2">
            第１１条（準拠法・裁判管轄）
          </h2>
          <p className="text-sm">
            本規約の解釈にあたっては、日本法を準拠法とします。
            本サービスに関して紛争が生じた場合には、当方の本店所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
