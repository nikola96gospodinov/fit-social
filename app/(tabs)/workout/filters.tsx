import { PaddedScrollView } from "@/components/padded-scroll-view/padded-scroll-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { BodyPartFilters } from "@/features/filters/body-part-filters/body-part-filters.component";
import { EquipmentFilters } from "@/features/filters/equipment-filters/equipment-filters.component";
import { TargetMuscleFilters } from "@/features/filters/target-muscle-filters/target-muscle-filters.component";

const Filters = () => {
  return (
    <PaddedScrollView>
      <BodyPartFilters />

      <VerticalSpacing size={8} />

      <TargetMuscleFilters />

      <VerticalSpacing size={8} />

      <EquipmentFilters />

      <VerticalSpacing size={8} />
    </PaddedScrollView>
  );
};

export default Filters;
